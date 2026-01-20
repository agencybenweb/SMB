import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Inscription réussie !</h1>
          <p className="text-gray-600">
            Votre compte a été créé avec succès.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
          <p className="text-sm text-blue-900">
            <strong>Important :</strong> Votre compte est en attente de validation
            par notre équipe. Vous recevrez un email de confirmation une fois
            votre compte activé. Cela peut prendre jusqu'à 24-48h.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/auth/login">Retour à la connexion</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}