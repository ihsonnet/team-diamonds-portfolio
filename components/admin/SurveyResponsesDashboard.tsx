"use client";

import { useDeferredValue, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  ClipboardList,
  Copy,
  Filter,
  Globe2,
  Laptop2,
  Search,
  Sparkles
} from "lucide-react";

type DashboardField = {
  key: string;
  label: string;
  value: string;
  rawValue: string | null;
};

type DashboardSection = {
  key: string;
  title: string;
  subtitle: string;
  answeredCount: number;
  unansweredCount: number;
  items: DashboardField[];
};

type DashboardResponse = {
  id: string;
  responseLabel: string;
  submittedAtLabel: string;
  submittedAtRaw: string | null;
  responseId: string;
  answeredCount: number;
  totalQuestions: number;
  completionPercent: number;
  searchText: string;
  facets: {
    age: DashboardField;
    grade: DashboardField;
    interest: DashboardField;
    device: DashboardField;
    country: DashboardField;
    tryDiamond: DashboardField;
    browser: DashboardField;
  };
  overviewItems: DashboardField[];
  sections: DashboardSection[];
  metadataItems: DashboardField[];
};

type SurveyResponsesDashboardProps = {
  endpointPath: string;
  responses: DashboardResponse[];
  lockAction: () => Promise<void>;
};

type FacetKey = keyof DashboardResponse["facets"];

const FILTER_FIELDS: Array<{ key: FacetKey; label: string }> = [
  { key: "age", label: "Age" },
  { key: "interest", label: "Interest" },
  { key: "device", label: "Device" },
  { key: "country", label: "Country" }
];

function getMostCommonLabel(responses: DashboardResponse[], facet: FacetKey) {
  const counts = new Map<string, { label: string; count: number }>();

  for (const response of responses) {
    const entry = response.facets[facet];
    if (!entry.rawValue) continue;

    const current = counts.get(entry.rawValue);
    counts.set(entry.rawValue, {
      label: entry.value,
      count: (current?.count ?? 0) + 1
    });
  }

  return [...counts.values()].sort((left, right) => right.count - left.count)[0]?.label ?? "No data";
}

function buildBreakdown(
  responses: DashboardResponse[],
  facet: FacetKey,
  limit: number
) {
  const counts = new Map<string, { label: string; count: number }>();

  for (const response of responses) {
    const entry = response.facets[facet];
    if (!entry.rawValue) continue;

    const current = counts.get(entry.rawValue);
    counts.set(entry.rawValue, {
      label: entry.value,
      count: (current?.count ?? 0) + 1
    });
  }

  return [...counts.entries()]
    .sort((left, right) => right[1].count - left[1].count || left[1].label.localeCompare(right[1].label))
    .slice(0, limit)
    .map(([value, details]) => ({
      value,
      label: details.label,
      count: details.count
    }));
}

function getFilterOptions(
  responses: DashboardResponse[],
  facet: FacetKey
) {
  const options = new Map<string, string>();

  for (const response of responses) {
    const entry = response.facets[facet];
    if (!entry.rawValue) continue;
    options.set(entry.rawValue, entry.value);
  }

  return [...options.entries()]
    .sort((left, right) => left[1].localeCompare(right[1]))
    .map(([value, label]) => ({ value, label }));
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatCard({
  eyebrow,
  value,
  helper
}: {
  eyebrow: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/95 p-5 shadow-lg shadow-slate-950/30">
      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
        {eyebrow}
      </p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{helper}</p>
    </div>
  );
}

function BreakdownCard({
  title,
  icon,
  items
}: {
  title: string;
  icon: ReactNode;
  items: Array<{ value: string; label: string; count: number }>;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/30">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-200">
          {icon}
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-300">
            Top patterns in the current view
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-4 py-5 text-sm text-slate-400">
          No data in this slice yet.
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div
              key={`${title}-${item.value}`}
              className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-100">
                  {item.label}
                </span>
                <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResponseListItem({
  response,
  isActive,
  onSelect
}: {
  response: DashboardResponse;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${
        isActive
          ? "border-cyan-300/60 bg-cyan-400/10 shadow-lg shadow-cyan-500/10"
          : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300">
            {response.responseLabel}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {response.submittedAtLabel}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {response.facets.country.rawValue ? response.facets.country.value : "Country unknown"} |{" "}
            {response.facets.device.rawValue ? response.facets.device.value : "Device unknown"} |{" "}
            {response.facets.browser.rawValue ? response.facets.browser.value : "Browser unknown"}
          </p>
        </div>
        <ChevronRight
          className={`mt-1 h-5 w-5 shrink-0 ${
            isActive ? "text-cyan-200" : "text-slate-500"
          }`}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[response.facets.age, response.facets.grade, response.facets.interest].map((item) => (
          <span
            key={`${response.id}-${item.key}`}
            className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs text-slate-200"
          >
            {item.value}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{response.answeredCount} answers recorded</span>
          <span>{response.completionPercent}% complete</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-white/10">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
            style={{ width: `${response.completionPercent}%` }}
          />
        </div>
      </div>
    </button>
  );
}

function DetailField({
  item
}: {
  item: DashboardField;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
        {item.label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-100">{item.value}</p>
    </div>
  );
}

function SectionCard({
  section
}: {
  section: DashboardSection;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-950/65 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
            {section.title}
          </p>
          <p className="mt-2 text-sm text-slate-400">{section.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
            {section.answeredCount} answered
          </span>
          {section.unansweredCount > 0 ? (
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
              {section.unansweredCount} skipped
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {section.items.map((item) => (
          <DetailField key={`${section.key}-${item.key}`} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function SurveyResponsesDashboard({
  endpointPath,
  responses,
  lockAction
}: SurveyResponsesDashboardProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedId, setSelectedId] = useState<string | null>(responses[0]?.id ?? null);
  const [filters, setFilters] = useState<Record<FacetKey, string>>({
    age: "all",
    grade: "all",
    interest: "all",
    device: "all",
    country: "all",
    tryDiamond: "all",
    browser: "all"
  });
  const [copied, setCopied] = useState(false);

  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const filteredResponses = [...responses]
    .filter((response) => {
      if (deferredSearch && !response.searchText.includes(deferredSearch)) {
        return false;
      }

      for (const filterField of FILTER_FIELDS) {
        const selectedValue = filters[filterField.key];
        if (selectedValue !== "all" && response.facets[filterField.key].rawValue !== selectedValue) {
          return false;
        }
      }

      return true;
    })
    .sort((left, right) => {
      if (sortOrder === "oldest") {
        return (left.submittedAtRaw ?? "").localeCompare(right.submittedAtRaw ?? "");
      }

      if (sortOrder === "completion") {
        return right.completionPercent - left.completionPercent;
      }

      return (right.submittedAtRaw ?? "").localeCompare(left.submittedAtRaw ?? "");
    });

  const activeResponse =
    filteredResponses.find((response) => response.id === selectedId) ??
    filteredResponses[0] ??
    null;

  const countriesInView = new Set(
    filteredResponses
      .map((response) => response.facets.country.rawValue)
      .filter(Boolean)
  ).size;

  const averageCompletion = filteredResponses.length
    ? Math.round(
        filteredResponses.reduce(
          (sum, response) => sum + response.completionPercent,
          0
        ) / filteredResponses.length
      )
    : 0;

  const latestInView =
    [...filteredResponses]
      .sort((left, right) =>
        (right.submittedAtRaw ?? "").localeCompare(left.submittedAtRaw ?? "")
      )[0]?.submittedAtLabel ?? "No matching responses";

  const breakdowns = [
    {
      title: "Device Mix",
      icon: <Laptop2 className="h-4 w-4" />,
      items: buildBreakdown(filteredResponses, "device", 4)
    },
    {
      title: "Country Snapshot",
      icon: <Globe2 className="h-4 w-4" />,
      items: buildBreakdown(filteredResponses, "country", 6)
    },
    {
      title: "Interest Trend",
      icon: <Sparkles className="h-4 w-4" />,
      items: buildBreakdown(filteredResponses, "interest", 5)
    }
  ];

  async function copyResponseId() {
    if (!activeResponse) return;

    await navigator.clipboard.writeText(activeResponse.responseId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function clearFilters() {
    setSearch("");
    setSortOrder("newest");
    setFilters({
      age: "all",
      grade: "all",
      interest: "all",
      device: "all",
      country: "all",
      tryDiamond: "all",
      browser: "all"
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-[36px] border border-white/12 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.98))] p-6 shadow-2xl shadow-slate-950/40 lg:p-8">
        <div className="flex flex-col gap-6 border-b border-white/8 pb-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">
              Private Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Survey response browser
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
              Search, filter, and inspect submissions without scrolling through one giant record. The JSON endpoint stays available for exports and scripts.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={endpointPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              <ArrowUpRight className="h-4 w-4" />
              Open JSON
            </a>
            <form action={lockAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Lock page
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-4">
          <StatCard
            eyebrow="Responses In View"
            value={`${filteredResponses.length}/${responses.length}`}
            helper="Updates as you search or filter"
          />
          <StatCard
            eyebrow="Average Completion"
            value={`${averageCompletion}%`}
            helper="How complete the visible responses are"
          />
          <StatCard
            eyebrow="Countries In View"
            value={String(countriesInView)}
            helper="Distinct countries among visible responses"
          />
          <StatCard
            eyebrow="Most Common Device"
            value={getMostCommonLabel(filteredResponses, "device")}
            helper={latestInView}
          />
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/60 p-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
              <label className="block flex-1">
                <span className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  <Search className="h-3.5 w-3.5" />
                  Search
                </span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by answer, browser, country, path, or response ID"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>

              <label className="block w-full lg:max-w-[220px]">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  Sort Responses
                </span>
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="completion">Most complete</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {FILTER_FIELDS.map((filterField) => (
                <FilterSelect
                  key={filterField.key}
                  label={filterField.label}
                  value={filters[filterField.key]}
                  options={getFilterOptions(responses, filterField.key)}
                  onChange={(value) =>
                    setFilters((current) => ({
                      ...current,
                      [filterField.key]: value
                    }))
                  }
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">
                <Filter className="h-3.5 w-3.5" />
                {filteredResponses.length} matching responses
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {breakdowns.map((breakdown) => (
            <BreakdownCard
              key={breakdown.title}
              title={breakdown.title}
              icon={breakdown.icon}
              items={breakdown.items}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="rounded-[30px] border border-white/10 bg-slate-950/68 p-5 shadow-lg shadow-slate-950/30">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
                  Response List
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Pick one response to inspect in detail.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300">
                <ClipboardList className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 space-y-3 xl:max-h-[1200px] xl:overflow-y-auto xl:pr-1">
              {filteredResponses.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] px-5 py-8 text-center text-sm text-slate-400">
                  No responses match the current filters.
                </div>
              ) : (
                filteredResponses.map((response) => (
                  <ResponseListItem
                    key={response.id}
                    response={response}
                    isActive={response.id === activeResponse?.id}
                    onSelect={() => setSelectedId(response.id)}
                  />
                ))
              )}
            </div>
          </aside>

          <div className="rounded-[30px] border border-white/10 bg-slate-950/68 p-5 shadow-lg shadow-slate-950/30">
            {!activeResponse ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-[26px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-12 text-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
                    No Response Selected
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                    Adjust your filters or choose a response from the list to see the grouped answer view.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 p-6">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
                        {activeResponse.responseLabel}
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">
                        {activeResponse.submittedAtLabel}
                      </h2>
                      <p className="mt-3 text-sm text-slate-300">
                        {activeResponse.facets.country.rawValue ? activeResponse.facets.country.value : "Country unknown"} |{" "}
                        {activeResponse.facets.device.rawValue ? activeResponse.facets.device.value : "Device unknown"} |{" "}
                        {activeResponse.facets.browser.rawValue ? activeResponse.facets.browser.value : "Browser unknown"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={copyResponseId}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied ID" : "Copy response ID"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {activeResponse.overviewItems.map((item) => (
                      <DetailField key={`overview-${item.key}`} item={item} />
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                      {activeResponse.answeredCount} of {activeResponse.totalQuestions} questions answered
                    </span>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                      {activeResponse.completionPercent}% completion
                    </span>
                  </div>
                </div>

                <div className="grid gap-5">
                  {activeResponse.sections.map((section) => (
                    <SectionCard key={section.key} section={section} />
                  ))}
                </div>

                <section className="rounded-[28px] border border-white/10 bg-slate-950/65 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
                        Request Context
                      </p>
                      <p className="mt-2 text-sm text-slate-400">
                        Technical details captured from the backend for this response.
                      </p>
                    </div>
                  </div>

                  {activeResponse.metadataItems.length === 0 ? (
                    <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-4 py-6 text-sm text-slate-400">
                      No request metadata is available for this response.
                    </div>
                  ) : (
                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      {activeResponse.metadataItems.map((item) => (
                        <DetailField key={`metadata-${item.key}`} item={item} />
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
