export default function FinancementPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Solutions de Financement</h1>
          <p className="text-xl text-gray-600">
            Plusieurs options s'offrent à vous pour financer vos équipements
            professionnels
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Nos Solutions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-2xl font-semibold mb-4">Paiement Comptant</h3>
              <p className="text-gray-600 mb-4">
                Paiement intégral à la commande. Idéal pour les professionnels
                ayant la trésorerie disponible.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>✓ Paiement sécurisé</li>
                <li>✓ Livraison rapide</li>
                <li>✓ Prix préférentiel possible</li>
              </ul>
            </div>

            <div className="border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold mb-4">
                Paiement Échelonné
              </h3>
              <p className="text-gray-600 mb-4">
                Règlement en plusieurs mensualités sans intérêt (selon conditions).
                Étalez votre investissement sur 3 à 12 mois.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>✓ 3 à 12 mensualités</li>
                <li>✓ Sans intérêt (sous conditions)</li>
                <li>✓ Sans apport initial</li>
              </ul>
            </div>

            <div className="border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-2xl font-semibold mb-4">Leasing</h3>
              <p className="text-gray-600 mb-4">
                Location avec option d'achat via notre partenaire financier.
                Solution flexible adaptée aux professionnels.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>✓ Loyer mensuel déductible</li>
                <li>✓ Option d'achat en fin de contrat</li>
                <li>✓ Durée flexible (24 à 60 mois)</li>
              </ul>
            </div>

            <div className="border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-semibold mb-4">Devis Personnalisé</h3>
              <p className="text-gray-600 mb-4">
                Demandez un devis personnalisé avec une solution de financement
                adaptée à votre situation.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>✓ Évaluation gratuite</li>
                <li>✓ Solutions sur mesure</li>
                <li>✓ Réponse sous 48h</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Avantages Fiscaux</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              L'achat d'équipements professionnels peut bénéficier d'avantages
              fiscaux selon votre situation :
            </p>
            <ul className="space-y-2">
              <li>
                <strong>Amortissement :</strong> Les appareils peuvent être
                amortis sur plusieurs années selon leur durée de vie.
              </li>
              <li>
                <strong>Crédit d'impôt :</strong> Certains équipements peuvent
                bénéficier de crédits d'impôt ou d'aides à l'investissement.
              </li>
              <li>
                <strong>TVA récupérable :</strong> La TVA sur l'achat d'équipements
                professionnels est récupérable pour les entreprises assujetties.
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              ⚠️ Ces informations sont données à titre indicatif. Nous vous
              recommandons de consulter un expert-comptable pour des conseils
              adaptés à votre situation.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Processus de Financement</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-2">Demande de devis</h4>
                <p className="text-gray-600">
                  Remplissez notre formulaire de contact ou demandez un devis en
                  ligne avec vos besoins.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-2">Étude de financement</h4>
                <p className="text-gray-600">
                  Notre équipe commerciale étudie votre demande et vous propose
                  la solution de financement la plus adaptée.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-2">Validation et signature</h4>
                <p className="text-gray-600">
                  Validation du devis et signature électronique du contrat de
                  financement si applicable.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-2">Livraison et formation</h4>
                <p className="text-gray-600">
                  Livraison de votre appareil et démarrage de la formation
                  professionnelle incluse.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t pt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="text-gray-600 mb-6">
            Contactez-nous pour discuter de vos besoins et obtenir une solution
            de financement adaptée
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Demander un devis
          </a>
        </section>
      </div>
    </div>
  );
}