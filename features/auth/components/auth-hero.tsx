import {
    ArrowRight,
    CircleUserRound,
    MessageCircle,
    ShieldCheck,
} from "lucide-react";
import { LoginButton } from "./auth-buttons";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export function AuthHero({ redirectTo }: { redirectTo: string }) {
    return (
        <div className="flex flex-1 flex-col justify-center py-14 sm:py-20">
            <section className="grid items-center gap-14 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:pb-28">
                <div className="max-w-2xl">
                    <h1 className="max-w-xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                        <span className="text-primary-foreground">
                            <img
                                src="/favicon.ico"
                                className="mr-3 inline size-[0.9em] -translate-y-2"
                                aria-hidden="true"
                            />
                            Unbound
                        </span>{" "}
                        Demo
                    </h1>
                    <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                        No signup flow and no complicated setup. Connect with
                        Unbound, inspect your identity, and enter a real-time
                        chat room.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2.5">
                        <LoginButton redirectTo={redirectTo} />
                        <a
                            href="https://unbound.rlzy.me"
                            className={buttonVariants({
                                variant: "outline",
                                className: "button-shimmer-hover",
                            })}
                        >
                            Learn Unbound
                            <ArrowRight aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <Card className="mx-auto w-full max-w-md p-6 mask-[linear-gradient(to_right,rgba(255,255,255,0.7)_0%,white_50%)] sm:p-7 lg:skew-y-[-12deg] lg:rotate-12">
                    <div className="flex items-start gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-background text-primary-foreground">
                            <ShieldCheck
                                className="size-6"
                                aria-hidden="true"
                            />
                        </span>
                        <div>
                            <p className="font-semibold">
                                Secure sign-in, compact demo
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Authorization Code with PKCE, a server-side
                                session, and no credentials handled by this
                                application.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
                        <MessageCircle
                            className="size-4 text-primary-foreground"
                            aria-hidden="true"
                        />
                        Real-time threaded chat after login
                    </div>
                </Card>
            </section>

            <section
                id="demo-details"
                className="border border-border px-6 py-7 text-sm leading-6 text-muted-foreground sm:px-8 flex flex-col gap-y-3 -mb-8"
            >
                <h1 className="text-xl font-bold text-white">Disclaimer!</h1>
                This focused demo shows the complete authentication handoff and
                a protected collaborative chat. It is intentionally small,
                direct, and built for evaluating the integration rather than
                acting as a full product.
            </section>
        </div>
    );
}
