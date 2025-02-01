import { Button } from "@newcompany/ui/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Outlet } from "react-router-dom";

export const LayoutForm = () => {
  // const location = useLocation();
  // const navigate = useNavigate();

  // const query = useQueryParams();

  // const organizationName = query.get("organizationName") || "";

  // const isSupplierManagement =
  //   location.pathname === "/auth/gestao-fornecedores/";

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button className="flex h-[42px] w-44 gap-ten px-5">
          <PlusCircle width={21} height={21} />
          Criar unidade
        </Button>
      <Outlet />
      {/* <div className="flex justify-between">
        <div
          className={`hidden h-screen w-full flex-col justify-between ${isSupplierManagement ? "bg-[#0F303B]" : "bg-bg"} text-white md:flex md:w-3/5`}
        >
          {isSupplierManagement ? (
            <div className="flex w-full max-w-[680px] flex-col gap-5 p-16 text-[20px]">
              <div className="h-1 w-8 bg-[#3BC3BB]" />
              <p>
                A {organizationName} está utilizando a plataforma Zaya para
                conhecer a atuação ambiental dos seus fornecedores.
              </p>
              <strong className="font-semibold">
                Para isso, precisamos que você faça cadastro na nossa plataforma
                e responda ao formulário.
              </strong>
              <span className="text-[#3BC3BB]">
                Fica tranquilo, não leva nem 5 minutos!
              </span>
            </div>
          ) : location.pathname === "/auth/register" ? (
            <>
              <div className="flex flex-col gap-5 p-16">
                <div className="h-1 w-8 bg-white"></div>
                <p className="text-4xl font-light leading-[45px]">
                  <Balancer>
                    Você deu o{" "}
                    <strong className="font-extrabold text-[#3BC3BB]">
                      primeiro passo
                    </strong>{" "}
                    para usar dados ambientais na tomada de decisão da sua
                    empresa.
                  </Balancer>
                </p>
              </div>
              <div className="flex gap-5 px-8 [&>*]:border [&>*]:border-[#019289] [&>*]:bg-[#03333E]/80">
                {formCards.map((card, index) => (
                  <Card
                    key={index}
                    className="items-start gap-ten rounded-md p-5"
                  >
                    <card.icon />
                    <p className="text-sm font-bold leading-4 text-[#C1FDF9]">
                      {card.title}
                    </p>
                    <p className="text-xs font-normal leading-4 text-[#7AA3AC]">
                      {card.description}
                    </p>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-5 p-16">
              <div className="h-1 w-8 bg-white"></div>
              <p className="text-4xl font-light leading-[45px]">
                Escale o uso de dados de
                <br /> impacto ambiental nas suas
                <strong className="font-extrabold text-[#3BC3BB]">
                  <br />
                  decisões de negócios.
                </strong>
              </p>
            </div>
          )}
          {isSupplierManagement ? (
            <div className="flex items-center justify-center">
              <Auth />
            </div>
          ) : (
            <FigureSvg className="h-auto w-full" />
          )}
        </div>
        <div
          className={cn(
            "bg-grey-400 h-screen w-full px-14 py-14 sm:px-20 md:block md:w-2/5 lg:px-28",
            location.pathname === "/auth" && "hidden",
          )}
        >
          <Logo />
          <Outlet />
        </div>
        {location.pathname === "/auth" && (
          <div className="flex h-screen w-full flex-col items-center justify-center gap-7 bg-[#012A33] px-10 text-white md:hidden">
            <MobileLoginHero className="h-[295px] w-[244px] sm:h-[339px] sm:w-[314px]" />
            <p className="text-xl font-bold leading-6">Que bom ter você!</p>
            <p className="text-center text-base font-normal leading-5">
              Para garantirmos sua segurança e uma melhor experiência, não
              disponibilizamos a Zaya pelo celular.
            </p>
            <p className="text-center font-extrabold">
              Por favor, faça seu login e continue pelo computador.
              <strong
                onClick={() => {
                  navigate("/auth/register");
                }}
                className="cursor-pointer text-[#81D8D3]"
              >
                {" "}
                Caso ainda não possua conta, clique aqui!
              </strong>
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
};
