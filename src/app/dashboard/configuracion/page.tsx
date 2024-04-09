import Link from "next/link"

import { MainWrapper } from "@/components/main-wrapper"
import { MainWrapperContent } from "@/components/main-wrapper-content"
import { MainWrapperHeader } from "@/components/main-wrapper-header"
import { ProfilePhoto } from "@/components/perfil/profile-photo"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function ConfiguracionPage() {

    // TODO: ENVOLVER EN UN LAYOUT PARA MANEJAR LAS DISTINTAS CONFIGURACIONES CON RUTAS "dashboard/configuracion/general", "dashboard/configuracion/seguridad"
    return (
        <MainWrapper>
            <MainWrapperHeader title="Configuración" />

            <MainWrapperContent>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <Link href="#" className="font-semibold text-primary">
                            General
                        </Link>
                        <Link href="#">Security</Link>
                        <Link href="#">Integrations</Link>
                        <Link href="#">Support</Link>
                        <Link href="#">Organizations</Link>
                        <Link href="#">Advanced</Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información personal</CardTitle>
                                <CardDescription>
                                    Used to identify your store in the marketplace.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <ProfilePhoto />
                                </form>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button>Save</Button>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </MainWrapperContent>

        </MainWrapper>
    )
}
