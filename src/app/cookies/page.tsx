/**
 * =====================================================================
 * RotaClara — Política de cookies (/cookies)
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { Card } from "@/components/ui/primitives";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de cookies",
  description:
    "Esta versão da RotaClara não usa cookies de rastreamento. Entenda o " +
    "que é armazenado localmente e o que pode mudar no futuro.",
  path: "/cookies",
});

const STORAGE_ITEMS = [
  {
    key: "rotaclara:itinerary:v1",
    what: "Roteiro de viagem montado na ferramenta de roteiro.",
    why: "Para que o roteiro continue disponível quando você voltar ao site.",
    duration: "Até você apagar o roteiro ou limpar os dados do site.",
  },
];

export default function CookiesPage() {
  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Cookies" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Institucional</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Política de cookies
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Em resumo: esta versão <strong>não usa cookies</strong> de
          rastreamento, nem de publicidade, nem de terceiros para
          perfilamento. O que existe é armazenamento local do navegador, que
          fica no seu dispositivo.
        </p>
        <p className="mt-3 text-sm text-[#736b5b]">
          Última atualização: <time dateTime="2026-11-13">13/11/2026</time>.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section aria-labelledby="o-que-sao">
            <h2
              id="o-que-sao"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              1. Cookies vs. armazenamento local
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#16304f]/85">
              <p>
                <strong>Cookie</strong> é um pequeno arquivo que o site pede
                para guardar no navegador e que é reenviado a cada requisição
                — é o mecanismo comum de sessão, lembrança de preferências e
                rastreamento.
              </p>
              <p>
                <strong>Armazenamento local (localStorage)</strong> fica
                guardado no seu navegador, não é enviado automaticamente com
                as requisições e não é lido por outros sites. É o que a
                RotaClara usa.
              </p>
              <p>
                A diferença prática: com armazenamento local, nada sai do seu
                dispositivo para permitir que o site lembre do seu roteiro.
              </p>
            </div>
          </section>

          <section aria-labelledby="armazenados">
            <h2
              id="armazenados"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              2. O que fica guardado no seu navegador
            </h2>
            <div className="mt-4 space-y-3">
              {STORAGE_ITEMS.map((item) => (
                <Card key={item.key}>
                  <p className="rounded-lg bg-[#faf8f4] px-3 py-2 font-mono text-xs text-[#16304f]">
                    {item.key}
                  </p>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="font-semibold text-[#0a1628]">O que é:</dt>
                      <dd className="mt-0.5 text-[#16304f]/85">{item.what}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#0a1628]">
                        Para que serve:
                      </dt>
                      <dd className="mt-0.5 text-[#16304f]/85">{item.why}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#0a1628]">
                        Duração:
                      </dt>
                      <dd className="mt-0.5 text-[#16304f]/85">
                        {item.duration}
                      </dd>
                    </div>
                  </dl>
                </Card>
              ))}
            </div>
          </section>

          <section aria-labelledby="nao-usamos">
            <h2
              id="nao-usamos"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              3. O que não usamos
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#16304f]">
              <li className="rounded-xl border border-[#e8e3d8] bg-white p-4">
                Cookies de publicidade ou de redes sociais.
              </li>
              <li className="rounded-xl border border-[#e8e3d8] bg-white p-4">
                Cookies de análise de comportamento para perfilamento.
              </li>
              <li className="rounded-xl border border-[#e8e3d8] bg-white p-4">
                Cookies de terceiros para personalização de anúncios.
              </li>
              <li className="rounded-xl border border-[#e8e3d8] bg-white p-4">
                Identificadores de dispositivo ou de publicidade.
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-[#736b5b]">
              Por não usarmos cookies não precisamos de um banner de
              consentimento — e preferimos não incomodar você com um aviso
              que não diria nada de verdade.
            </p>
          </section>

          <section aria-labelledby="mudancas-cookies">
            <h2
              id="mudancas-cookies"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              4. Se isso mudar
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#16304f]/85">
              Se no futuro adicionarmos cookies (por exemplo, para medir
              audiência de forma agregada ou exibir preferências), esta
              política será atualizada com a data da revisão e, quando
              necessário, um aviso adequado será apresentado. Veja também a{" "}
              <Link
                href="/privacidade"
                className="font-medium text-[#0f6f69] underline underline-offset-2"
              >
                política de privacidade
              </Link>
              .
            </p>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[calc(var(--rc-header-h)+1.5rem)] lg:self-start">
          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Como remover o armazenamento
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#736b5b]">
              Duas formas:
            </p>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-[#16304f]">
              <li>
                1. No{" "}
                <Link
                  href="/roteiro"
                  className="font-medium text-[#0f6f69] underline underline-offset-2"
                >
                  construtor de roteiro
                </Link>
                , use “Apagar roteiro”; ou
              </li>
              <li>
                2. Nas configurações do navegador, limpe os dados do site
                RotaClara.
              </li>
            </ol>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Dúvidas?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#736b5b]">
              Fale com a gente pelo formulário de contato.
            </p>
            <Link
              href="/contato"
              className="mt-3 inline-block text-sm font-medium text-[#0f6f69] underline underline-offset-2"
            >
              Abrir contato →
            </Link>
          </Card>
        </aside>
      </div>
    </div>
  );
}
