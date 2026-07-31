import {
  Briefcase,
  Target,
  BarChart3,
  FileText,
  CheckCircle,
  ArrowRight,
  Search,
  ClipboardList,
  TrendingUp,
  Star,
} from "lucide-react";

import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Landing() {
  const features = [
    {
      icon: Target,
      title: "Centralized Hub",
      description:
        "Store every application in one place and never lose track of where you've applied.",
    },
    {
      icon: FileText,
      title: "Track Every Stage",
      description:
        "Move applications between Applied, Interview, Offer and Rejected with a single click.",
    },
    {
      icon: BarChart3,
      title: "Powerful Analytics",
      description:
        "Visualise your job search progress with insightful charts and application trends.",
    },
  ];

  const steps = [
    {
      icon: Search,
      title: "Apply for Jobs",
      description:
        "Search for opportunities on your favourite job platforms and apply confidently.",
    },
    {
      icon: ClipboardList,
      title: "Track Progress",
      description:
        "Record every application and update its status throughout the hiring process.",
    },
    {
      icon: TrendingUp,
      title: "Improve Faster",
      description:
        "Use analytics to understand what's working and optimise your job search.",
    },
  ];

  const testimonials = [
    {
      name: "Shruti Chandra",
      role: "Software Engineer",
      text: "I used spreadsheets before finding ApplySphere. This app completely changed how I manage my applications.",
      rating: 5,
    },
    {
      name: "Rahul Patel",
      role: "Frontend Developer",
      text: "The analytics helped me understand where I needed to improve my applications. Highly recommended.",
      rating: 5,
    },
    {
      name: "Emily Brown",
      role: "Marketing Manager",
      text: "Beautiful interface, easy to use, and finally I know exactly where every application stands.",
      rating: 4,
    },
  ]

  const faq = [
    {
      question: "Is ApplySphere free to use?",
      answer: "Yes! You can start tracking your job applications for free."
    },
    {
      question: "Can I update application statuses?",
      answer: " Yes. Move applications between Applied, Interview, Offer and Rejected whenever your hiring process progresses."
    },
    {
      question: "Does it work on mobile devices?",
      answer: "Absolutely. ApplySphere is fully responsive and works beautifully on phones, tablets and desktops."
    },
    {
      question: "Can I track multiple applications?",
      answer: "Yes. Add and manage as many job applications as you want from a single dashboard."
    },

  ]

  return (
    <div className="min-h-screen bg-linear-to-bl from-primary/10 via-primary/5 to-primary/20">

      {/* ---------------- HEADER ---------------- */}

      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>

            <span className="text-xl font-bold">ApplySphere</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>

            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}

      <section className="pt-16 pb-24 lg:pt-32 lg:pb-44">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <CheckCircle className="h-4 w-4" />
              Organise your job search effortlessly
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Land Your Next Job
              <br />
              <span className="text-primary">Without Losing Track</span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
              ApplySphere helps you organise applications, manage interview
              stages, monitor offers, and gain insights into your job search —
              all from one beautiful dashboard.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2 px-8">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/login">
                <Button size="lg" variant="outline" className="px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}

      <section className="bg-accent/30 py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Everything you need to stay organised
            </h2>

            <p className="mt-5 text-lg text-muted-foreground">
              Stop using spreadsheets and scattered notes. Track your entire job
              search from one place.
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex h-full flex-col rounded-3xl border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="mb-4 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}

      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Three simple steps to success
            </h2>

            <p className="mt-5 text-lg text-muted-foreground">
              Spend less time organising your applications and more time
              preparing for interviews.
            </p>
          </div>

          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-9 w-9" />
                </div>

                <div className="mt-6 text-primary font-semibold">
                  Step {index + 1}
                </div>

                <h3 className="mt-3 text-xl font-bold">{step.title}</h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}

      <section className="py-32 bg-accent/20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Loved by job seekers everywhere
            </h2>

            <p className="mt-5 text-lg text-muted-foreground">
              Thousands of users rely on ApplySphere to organise their job
              search.
            </p>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {testimonials.map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border bg-card p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mb-6 flex gap-1 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500" />
                  ))}
                </div>

                <p className="leading-7 text-muted-foreground">
                  "{review.text}"
                </p>

                <div className="mt-8">
                  <h4 className="font-semibold">{review.name}</h4>

                  <p className="text-sm text-muted-foreground">
                    {review.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}

      <section className="py-32 bg-muted/30">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Frequently Asked Questions
            </h2>

            <p className="mt-5 text-lg text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border bg-card shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {
                faq.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question} className="px-6">
                    <AccordionTrigger>
                      {faq.question}
                    </AccordionTrigger>

                    <AccordionContent className="text-muted-foreground leading-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))
              }
            </Accordion>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-32 bg-primary rounded-3xl text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl rounded-3xl border bg-accent p-12 text-center shadow-sm lg:p-20">
            <h2 className="text-3xl font-bold lg:text-5xl">
              Ready to organise your job search?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Join thousands of professionals who trust ApplySphere to keep
              every application organised and every opportunity within reach.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2 px-8">
                  Start Tracking Today
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/login">
                <Button size="lg" variant="outline" className="px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}

      <footer className="border-t bg-card">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Briefcase className="h-5 w-5 text-primary-foreground" />
                </div>

                <span className="text-xl font-bold">
                  ApplySphere
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                Helping job seekers organise applications, track interviews,
                and land their dream careers with confidence.
              </p>
            </div>

            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
              >
                Home
              </Link>

              <Link
                href="/login"
                className="transition-colors hover:text-foreground"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="transition-colors hover:text-foreground"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2026 ApplySphere. All rights reserved.
          </div>
        </div>
      </footer>
    </div >
  );
}