export const mockParentDashboard = {
  dueDate: "June 2026",
  weeksRemaining: 14,
  preferenceTags: [
    "Home birth",
    "VBAC",
    "Insurance",
    "Balanced care",
    "English",
  ],
  savedQuestions: [
    { category: "Safety", question: "What is your transfer plan if complications arise?" },
    { category: "Budget", question: "What does your fee include, and are there additional costs?" },
    { category: "Communication", question: "How do you prefer to communicate between visits?" },
    { category: "Care", question: "How do you approach pain management during labor?" },
  ],
  remainingMatches: [
    {
      id: "provider-5",
      name: "Dr. Emily Park",
      credentials: "CNM, DNP",
      initials: "EP",
      matchScore: 82,
      distance: 12.3,
      location: "Carlsbad",
      tags: ["Evidence-based", "First-time parents"],
    },
  ],
  contextualResource: {
    responded: {
      title: "Preparing for your consult?",
      description: "Read our guide to making the most of your first conversation.",
      link: "/exploring",
    },
    sent: {
      title: "While you wait",
      description: "Questions to ask your midwife — build your checklist now.",
      link: "/exploring",
    },
    scheduled: {
      title: "Your consult is coming up",
      description: "Here's how to prepare and what to expect.",
      link: "/exploring",
    },
  },
};
