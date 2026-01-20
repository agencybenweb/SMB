import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DeviceNotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Appareil non trouvé</h1>
        <p className="text-gray-600 mb-8">
          L'appareil que vous recherchez n'existe pas ou n'est plus disponible.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/appareils">Voir tous les appareils</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}