export type MissionOption = {
  label: string;
  value: string;
};

export type MissionQuestion = {
  id: string;
  label: string;
  options: MissionOption[];
};

export type MissionPhase = {
  key: string;
  title: string;
  subtitle: string;
  questions: MissionQuestion[];
};

export const MISSION_PHASES: MissionPhase[] = [
  {
    key: "cadet_profile",
    title: "Space Cadet Profile",
    subtitle: "Tell us a little bit about yourself!",
    questions: [
      {
        id: "age",
        label: "How old are you?",
        options: [
          { label: "Under 10", value: "under_10" },
          { label: "10-12 years", value: "10-12" },
          { label: "13-15 years", value: "13-15" },
          { label: "16+ years", value: "16+" }
        ]
      },
      {
        id: "grade",
        label: "What is your grade level?",
        options: [
          { label: "Grades 1-3", value: "1-3" },
          { label: "Grades 4-6", value: "4-6" },
          { label: "Grades 7-9", value: "7-9" },
          { label: "Grade 10+", value: "10+" }
        ]
      },
      {
        id: "gender",
        label: "What is your gender?",
        options: [
          { label: "Boy", value: "male" },
          { label: "Girl", value: "female" },
          { label: "Prefer not to say", value: "n/a" }
        ]
      },
      {
        id: "learned_space",
        label: "Have you ever learned about space in school?",
        options: [
          { label: "Yes!", value: "yes" },
          { label: "No, not yet", value: "no" }
        ]
      }
    ]
  },
  {
    key: "space_explorer",
    title: "Space Explorer",
    subtitle: "What do you think about the universe?",
    questions: [
      {
        id: "interest_level",
        label: "How interested are you in learning about space?",
        options: [
          { label: "Super interested!", value: "very" },
          { label: "A little bit", value: "somewhat" },
          { label: "Neutral", value: "neutral" },
          { label: "Not really", value: "not_very" },
          { label: "Not at all", value: "not_at_all" }
        ]
      },
      {
        id: "start_learning",
        label: "When did you first learn about space?",
        options: [
          { label: "When I was little (Grades 1-3)", value: "early" },
          { label: "A bit later (Grades 4-6)", value: "middle" },
          { label: "Just recently (Grades 7-9)", value: "recent" },
          { label: "I don't remember", value: "unknown" }
        ]
      },
      {
        id: "interest_compare",
        label: "Compared to before, do you like space:",
        options: [
          { label: "A lot more now!", value: "higher" },
          { label: "About the same", value: "same" },
          { label: "Less than before", value: "lower" }
        ]
      },
      {
        id: "lower_age",
        label: "If you like it less, when did that happen?",
        options: [
          { label: "Before I was 8", value: "before_8" },
          { label: "Ages 8-10", value: "8-10" },
          { label: "Ages 11-13", value: "11-13" },
          { label: "Ages 14-16", value: "14-16" },
          { label: "I'm not sure", value: "not_sure" }
        ]
      },
      {
        id: "lower_reason",
        label: "What made you lose interest? (Pick your main reason)",
        options: [
          { label: "It's too hard", value: "hard" },
          { label: "It's not exciting", value: "boring" },
          { label: "Too many facts", value: "facts" },
          { label: "No fun activities", value: "no_hands" },
          { label: "I don't relate to it", value: "relate" }
        ]
      }
    ]
  },
  {
    key: "future_missions",
    title: "Future Missions",
    subtitle: "Games, rewards, and the future!",
    questions: [
      {
        id: "pref_learning",
        label: "How would you rather learn about space?",
        options: [
          { label: "Reading a book", value: "textbook" },
          { label: "Watching videos", value: "video" },
          { label: "Playing a game", value: "game" },
          { label: "Doing experiments", value: "experiment" }
        ]
      },
      {
        id: "played_game",
        label: "Have you ever played a learning game before?",
        options: [
          { label: "Yes!", value: "yes" },
          { label: "No", value: "no" }
        ]
      },
      {
        id: "liked_game",
        label: "If yes, what was the best part?",
        options: [
          { label: "Getting rewards", value: "rewards" },
          { label: "Playing with friends", value: "compete" },
          { label: "Beating missions", value: "missions" },
          { label: "Exploring worlds", value: "explore" },
          { label: "Cool stories", value: "story" }
        ]
      },
      {
        id: "game_features",
        label: "What makes a game super fun for you?",
        options: [
          { label: "Badges & Points", value: "rewards" },
          { label: "An awesome story", value: "story" },
          { label: "Playing on a team", value: "team" },
          { label: "Real NASA stuff", value: "nasa" }
        ]
      },
      {
        id: "try_diamond",
        label: "Want to try our new game 'Diamond in the Sky'?",
        options: [
          { label: "Yes, definitely!", value: "yes" },
          { label: "Maybe", value: "maybe" },
          { label: "I don't know", value: "unsure" },
          { label: "No thanks", value: "no" }
        ]
      },
      {
        id: "dream_stem",
        label: "Do you dream of working in space or science?",
        options: [
          { label: "Yes, I do!", value: "yes" },
          { label: "Maybe someday", value: "maybe" },
          { label: "Not really", value: "not_really" },
          { label: "No", value: "no" }
        ]
      },
      {
        id: "inspire_stem",
        label: "Could a space game make you want to be a scientist?",
        options: [
          { label: "Definitely!", value: "yes" },
          { label: "Maybe", value: "maybe" },
          { label: "Not sure", value: "unsure" },
          { label: "No", value: "no" }
        ]
      }
    ]
  }
];

export const SURVEY_FIELD_ORDER = MISSION_PHASES.flatMap((phase) =>
  phase.questions.map((question) => question.id)
);
