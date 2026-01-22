"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqData = [
    {
        question: "Quels types d'appareils proposez-vous ?",
        answer: "Nous proposons une gamme complète d'appareils esthétiques professionnels de dernière génération : Lasers d'épilation, appareils de cryolipolyse, technologies de radiofréquence, Hydrafacial, et bien plus. Consultez notre catalogue pour découvrir l'ensemble de nos solutions."
    },
    {
        question: "Proposez-vous une formation sur les appareils ?",
        answer: "Absolument. Chaque acquisition d'appareil inclut une formation complète théorique et pratique assurée par nos experts formateurs. Nous vous délivrons un certificat à l'issue de la formation pour attester de votre compétence."
    },
    {
        question: "Quelles sont les garanties sur vos équipements ?",
        answer: "Tous nos équipements neufs bénéficient d'une garantie constructeur de 2 ans incluant pièces et main d'œuvre. Nous proposons également des extensions de garantie et des contrats de maintenance pour une sérénité totale."
    },
    {
        question: "Comment fonctionne le SAV ?",
        answer: "Notre Service Après-Vente est disponible via votre espace client pro. Vous pouvez ouvrir un ticket incident 24/7. Nos techniciens interviennent à distance ou sur site selon la nature du problème pour garantir une continuité de vos services."
    },
    {
        question: "Quels sont les délais de livraison ?",
        answer: "Pour les appareils en stock, la livraison est effectuée sous 5 à 10 jours ouvrés en France métropolitaine. Pour les commandes sur mesure ou en réassort, les délais peuvent varier de 3 à 5 semaines."
    },
    {
        question: "Proposez-vous des facilités de paiement ?",
        answer: "Oui, nous travaillons avec des partenaires financiers pour vous proposer des solutions de leasing ou de crédit-bail adaptées à votre trésorerie."
    }
];

function FaqItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-4 bg-white dark:bg-slate-900 transition-all duration-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
                <span className="font-semibold text-lg text-slate-900 dark:text-white">{question}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0 ml-4" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-4" />
                )}
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                        Questions Fréquentes
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Retrouvez ici les réponses aux questions les plus courantes sur nos technologies, nos services et votre accompagnement.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <FaqItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
                        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                            Notre équipe d'experts est là pour vous accompagner. N'hésitez pas à nous contacter directement pour une réponse personnalisée.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Contactez-nous
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
