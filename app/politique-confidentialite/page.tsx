import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Politique de Confidentialité | My Sculpt Technology",
    description: "Politique de gestion des données personnelles et cookies.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white">
                    Politique de Confidentialité
                </h1>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8 text-slate-600 dark:text-slate-300 text-justify">

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">Collecte des informations</h2>
                        <p>
                            Nous collectons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, faites un achat, ou remplissez un formulaire. Les informations collectées incluent votre nom, le nom de votre entreprise, votre adresse e-mail, votre numéro de téléphone et vos informations de facturation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">Utilisation des informations</h2>
                        <p>
                            Toute les informations que nous recueillons auprès de vous peuvent être utilisées pour :
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                            <li>Fournir un contenu publicitaire personnalisé</li>
                            <li>Améliorer notre site Web</li>
                            <li>Améliorer le service client et vos besoins de prise en charge</li>
                            <li>Vous contacter par e-mail</li>
                            <li>Administrer un concours, une promotion, ou une enquête</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">Confidentialité du commerce en ligne</h2>
                        <p>
                            Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">Divulgation à des tiers</h2>
                        <p>
                            Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white border-l-4 border-primary pl-4">Contact</h2>
                        <p>
                            Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse suivante : contact@mysculpt-tech.fr.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
