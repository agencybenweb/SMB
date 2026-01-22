import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CGV | My Sculpt Technology",
    description: "Conditions Générales de Vente de My Sculpt Technology pour les professionnels.",
};

export default function CGVPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white">
                    Conditions Générales de Vente
                </h1>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8 text-slate-600 dark:text-slate-300 text-justify">

                    <p className="italic text-sm text-slate-500">Dernière mise à jour : Janvier 2026</p>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">1. Objet</h2>
                        <p>
                            Les présentes Conditions Générales de Vente (ci-après "CGV") régissent les relations contractuelles entre la société My Sculpt Technology et ses clients professionnels (ci-après "le Client") dans le cadre de la vente d'équipements esthétiques professionnels.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">2. Commandes</h2>
                        <p>
                            Toute commande passée sur le site ou via un devis signé implique l'acceptation sans réserve des présentes CGV. Les commandes ne sont définitives qu'après validation par My Sculpt Technology et réception du paiement (acompte ou totalité selon les conditions convenues).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">3. Prix et Modalités de Paiement</h2>
                        <p>
                            Les prix des produits sont indiqués en euros hors taxes (HT). La TVA applicable est celle en vigueur au jour de la facturation. Le paiement s'effectue par virement bancaire, sauf accord contraire. En cas de retard de paiement, des pénalités seront appliquées conformément à la législation en vigueur.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">4. Livraison</h2>
                        <p>
                            Les délais de livraison sont donnés à titre indicatif. My Sculpt Technology s'efforce de respecter ces délais mais ne saurait être tenu responsable des retards indépendants de sa volonté (transporteur, douanes, force majeure). Les risques sont transférés au Client dès la sortie des entrepôts.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">5. Garantie</h2>
                        <p>
                            Nos équipements bénéficient d'une garantie constructeur de 2 ans pièces et main d'œuvre, hors pièces d'usure et consommables. La garantie ne couvre pas les dommages résultant d'une mauvaise utilisation, d'une négligence ou d'une modification non autorisée du matériel.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">6. Formation</h2>
                        <p>
                            L'acquisition de certains équipements inclut une formation obligatoire pour assurer une utilisation sécurisée et efficace. Cette formation est dispensée selon les modalités définies lors de la commande.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">7. Litiges</h2>
                        <p>
                            Tout litige relatif à l'interprétation et à l'exécution des présentes CGV est soumis au droit français. À défaut de résolution amiable, le litige sera porté devant le Tribunal de Commerce de [Ville du Tribunal].
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
