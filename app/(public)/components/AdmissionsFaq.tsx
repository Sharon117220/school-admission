const questions = [
  {
    question: "Which grades can I apply for?",
    answer:
      "You can apply for any class from Grade 1 through Grade 12.",
  },
  {
    question: "What information do I need to apply?",
    answer:
      "Have the student’s full name, parent or guardian name, phone number, email address, and preferred grade ready.",
  },
  {
    question: "How do I check my application status?",
    answer:
      "After submitting, sign in to the Student Portal with the account created during the application. Your application status will appear there.",
  },
  {
    question: "Can I change my application status?",
    answer:
      "Only school administrators can approve or reject applications. Students can sign in to view the latest status.",
  },
];

export default function AdmissionsFaq() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Here to help
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Questions about admissions?
          </h2>
          <p className="mt-4 max-w-md leading-7 text-slate-600">
            Find the basics you need to get started with an application and
            follow its progress.
          </p>
          <a
            href="#admission"
            className="mt-7 inline-flex items-center font-bold text-blue-700 transition hover:text-blue-900"
          >
            Start your application <span aria-hidden="true" className="ml-2">→</span>
          </a>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-slate-900 marker:hidden">
                {question}
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pr-12 pt-3 leading-7 text-slate-600">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
