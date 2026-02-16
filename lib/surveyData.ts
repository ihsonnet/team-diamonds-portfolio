export type Choice = { value: string; label: string };

export type Question =
  | { id: string; type: "single"; label: string; options: Choice[]; required?: boolean }
  | { id: string; type: "multi"; label: string; options: Choice[]; required?: boolean; max?: number }
  | { id: string; type: "text"; label: string; placeholder?: string; required?: boolean };

export type Step = {
  key: "about" | "interest" | "learning" | "dreams";
  title: string;
  questions: Question[];
};

export const SURVEY_META = {
  brand: "Space Survey",
  agesLabel: "For Kids Ages 10–16",
  headline: "Tell Us About You & Space",
  parentNote: "For Parents: This survey is anonymous and collects no personal identifying information."
} as const;

export const SURVEY_STEPS: Step[] = [
  {
    key: "about",
    title: "About You",
    questions: [
      {
        id: "age_range",
        type: "single",
        label: "How old are you?",
        required: true,
        options: [
          { value: "7-9", label: "7–9 years" },
          { value: "10-12", label: "10–12 years" },
          { value: "13-14", label: "13–14 years" },
          { value: "15-16", label: "15–16 years" }
        ]
      },
      {
        id: "gender",
        type: "single",
        label: "What is your gender?",
        required: true,
        options: [
          { value: "boy", label: "Boy" },
          { value: "girl", label: "Girl" },
          { value: "prefer_not_say", label: "Prefer not to say" }
        ]
      },
      {
        id: "country",
        type: "text",
        label: "Which country do you live in?",
        placeholder: "Type your country..."
      }
    ]
  },
  {
    key: "interest",
    title: "Interest in Space",
    questions: [
      {
        id: "interest_level",
        type: "single",
        label: "How interested are you in space and stars?",
        required: true,
        options: [
          { value: "not_at_all", label: "Not at all" },
          { value: "a_little", label: "A little" },
          { value: "somewhat", label: "Somewhat" },
          { value: "very", label: "Very" },
          { value: "super", label: "Super interested!" }
        ]
      },
      {
        id: "look_sky",
        type: "single",
        label: "How often do you look at the night sky?",
        options: [
          { value: "never", label: "Never" },
          { value: "sometimes", label: "Sometimes" },
          { value: "often", label: "Often" },
          { value: "every_chance", label: "Every chance I get!" }
        ]
      },
      {
        id: "topics",
        type: "multi",
        max: 3,
        label: "What space topics interest you most? (choose up to 3)",
        options: [
          { value: "stars", label: "Stars & Constellations" },
          { value: "planets", label: "Planets" },
          { value: "black_holes", label: "Black Holes" },
          { value: "astronauts", label: "Astronauts" },
          { value: "rockets", label: "Rockets" },
          { value: "aliens", label: "Aliens" }
        ]
      }
    ]
  },
  {
    key: "learning",
    title: "Learning Preferences",
    questions: [
      {
        id: "learn_way",
        type: "multi",
        label: "How do you prefer to learn about space?",
        options: [
          { value: "games", label: "Games" },
          { value: "videos", label: "Videos" },
          { value: "books", label: "Books" },
          { value: "apps", label: "Apps" },
          { value: "stargazing", label: "Stargazing" },
          { value: "museums", label: "Museums" }
        ]
      },
      {
        id: "fun_factors",
        type: "multi",
        label: "What makes a space game fun?",
        options: [
          { value: "rewards", label: "Earning rewards" },
          { value: "puzzles", label: "Solving puzzles" },
          { value: "creating", label: "Creating things" },
          { value: "competing", label: "Competing" },
          { value: "facts", label: "Learning facts" },
          { value: "exploring", label: "Exploring" }
        ]
      }
    ]
  },
  {
    key: "dreams",
    title: "Future Dreams",
    questions: [
      {
        id: "space_job",
        type: "single",
        label: "Would you like a job related to space?",
        options: [
          { value: "yes_definitely", label: "Yes, definitely!" },
          { value: "maybe", label: "Maybe" },
          { value: "not_sure", label: "Not sure" },
          { value: "probably_not", label: "Probably not" }
        ]
      },
      {
        id: "travel_space",
        type: "single",
        label: "Would you want to travel to space?",
        options: [
          { value: "moon", label: "Yes! To the Moon!" },
          { value: "mars", label: "Yes! To Mars!" },
          { value: "orbit", label: "Just orbit Earth" },
          { value: "stay", label: "I’d stay on Earth" }
        ]
      },
      {
        id: "ideas",
        type: "text",
        label: "What would make learning about space more fun?",
        placeholder: "Share your ideas..."
      }
    ]
  }
];