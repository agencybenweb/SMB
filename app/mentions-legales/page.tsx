import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions Légales | My Sculpt Technology",
    description: "Mentions légales et informations sur la société My Sculpt Technology.",
};

export default function MentionsLegalesPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white">
                    Mentions Légales
                </h1>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8 text-slate-600 dark:text-slate-300">

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">Éditeur du Site</h2>
                        <p>
                            Le site <strong>My Sculpt Technology</strong> est édité par la société <strong>My Sculpt Technology</strong>.<br />
                            <br />
                            <strong>Forme juridique :</strong> SASU au capital de 1 000 €<br />
                            <strong>Siège social :</strong> 123 Avenue des Champs-Élysées, 75008 Paris (Exemple)<br />
                            <strong>RCS :</strong> Paris B 123 456 789<br />
                            <strong>Numéro de TVA Intracommunautaire :</strong> FR 12 123456789<br />
                            <strong>Directeur de la publication :</strong> M. Benjamin Lelièvre<br />
                            <strong>Contact :</strong> contact@mysculpt-tech.fr
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">Hébergement</h2>
                        <p>
                            Le site est hébergé par :<br />
                            <strong>IONOS SARL</strong><br />
                            7, place de la Gare, BP 70109, 57200 Sarreguemines Cedex<br />
                            France
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">Propriété Intellectuelle</h2>
                        <p>
                            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">Protection des Données</h2>
                        <p>
                            Conformément à la loi « Informatique et Libertés », vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent. Pour l'exercer, adressez-vous à contact@mysculpt-tech.fr.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
