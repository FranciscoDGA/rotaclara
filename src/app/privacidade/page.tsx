/**
 * =====================================================================
 * RotaClara — Política de privacidade (/privacidade)
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { Card } from "@/components/ui/primitives";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidade",
  description:
    "O que a RotaClara coleta (e o que não coleta), como o roteiro fica " +
    "salvo no seu navegador e quais direitos você tem pela LGPD.",
  path: "/privacidade",
});

const NOT_COLLECTED = [
  "Cadastro, senha ou conta de usuário — a v1 não exige login.",
  "Nome, e-mail ou telefone enviados a nossos servidores.",
  "Dados de pagamento — não processamos nenhuma compra.",
  "Histórico de navegação enviado para servidores nossos.",
  "Cookies de publicidade ou de terceiros para perfilamento.",
];

export default function PrivacidadePage() {
  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Privacidade" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Institucional</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Política de privacidade
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Resumo direto: a v1 da RotaClara funciona sem cadastro e não envia
          dados pessoais para os nossos servidores. O que você monta fica no
          seu navegador.
        </p>
        <p className="mt-3 text-sm text-[#8c8471]">
          Última atualização: <time dateTime="2026-11-13">13/11/2026</time>.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section aria-labelledby="o-que-coletamos">
            <h2
              id="o-que-coletamos"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              1. O que coletamos
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#16304f]/85">
              <p>
                Na v1, a plataforma é majoritariamente estática. As ferramentas
                (calculadora, planejador e construtor de roteiro) rodam
                inteiramente no seu navegador, com os dados que você mesmo
                informa.
              </p>
              <p>
                O roteiro que você monta é gravado no{" "}
                <strong>armazenamento local do navegador</strong> (localStorage)
                para que ele continue lá quando você voltar. Esse dado nunca é
                enviado a um servidor nosso — e você pode apagá-lo a qualquer
                momento pelo botão “Apagar roteiro” na ferramenta ou limpando
                os dados do site no seu navegador.
              </p>
              <p>
                Ao usar o formulário de contato, o texto é entregue ao seu
                próprio aplicativo de e-mail. Nada passa por este site.
              </p>
            </div>
          </section>

          <section aria-labelledby="o-que-nao-coletamos">
            <h2
              id="o-que-nao-coletamos"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              2. O que não coletamos
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NOT_COLLECTED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-[#e8e3d8] bg-white p-4 text-sm leading-relaxed text-[#16304f]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#a32b2b]"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cookies">
            <h2
              id="cookies"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              3. Cookies e tecnologias semelhantes
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#16304f]/85">
              <p>
                Esta versão não usa cookies de publicidade, nem ferramentas de
                perfilamento de terceiros. O armazenamento local descrito acima
                não é um cookie: ele fica só no seu dispositivo e não é lido
                por outros sites.
              </p>
              <p>
                Ferramentas de terceiros podem ser incorporadas no futuro (por
                exemplo, um mapa). Nesse caso, esta política será atualizada
                antes da mudança valer, com a data da revisão.
              </p>
            </div>
          </section>

          <section aria-labelledby="terceiros">
            <h2
              id="terceiros"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              4. Sites de terceiros
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#16304f]/85">
              <p>
                Links de afiliados levam a sites de parceiros (busca de
                hospedagem, passeios, passagens). A partir do clique, vale a
                política de privacidade do parceiro. Veja a{" "}
                <Link
                  href="/afiliados"
                  className="font-medium text-[#17827c] underline underline-offset-2"
                >
                  política de afiliados
                </Link>{" "}
                para entender quando cada link aparece.
              </p>
              <p>
                Não compartilhamos dados pessoais com parceiros porque, na v1,
                não temos dados pessoais para compartilhar.
              </p>
            </div>
          </section>

          <section aria-labelledby="direitos">
            <h2
              id="direitos"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              5. Seus direitos (LGPD)
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#16304f]/85">
              <p>
                Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você
                pode solicitar confirmação de tratamento, acesso, correção,
                anonimização, portabilidade ou eliminação dos dados que
                eventualmente venhamos a tratar.
              </p>
              <p>
                Como a v1 não mantém base de dados de usuários, a maioria dos
                pedidos se resolve limpando os dados do próprio navegador. Se
                você enviou um e-mail pelo formulário de contato, pode pedir a
                exclusão da correspondência a qualquer momento.
              </p>
              <p>
                Encaminhe solicitações pelo{" "}
                <Link
                  href="/contato"
                  className="font-medium text-[#17827c] underline underline-offset-2"
                >
                  formulário de contato
                </Link>{" "}
                com o assunto “Privacidade”.
              </p>
            </div>
          </section>

          <section aria-labelledby="mudancas">
            <h2
              id="mudancas"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              6. Mudanças nesta política
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#16304f]/85">
              Se a forma como tratamos dados mudar, atualizaremos esta página e
              a data da revisão no topo. Mudanças relevantes serão destacadas
              na homepage por um período razoável.
            </p>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[calc(var(--rc-header-h)+1.5rem)] lg:self-start">
          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Apagar tudo agora
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#8c8471]">
              Para remover o roteiro salvo neste navegador:
            </p>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-[#16304f]">
              <li>
                1. Abra o{" "}
                <Link
                  href="/roteiro"
                  className="font-medium text-[#17827c] underline underline-offset-2"
                >
                  construtor de roteiro
                </Link>{" "}
                e clique em “Apagar roteiro”; ou
              </li>
              <li>
                2. Limpe os dados do site nas configurações do seu navegador
                (isso remove tudo, incluindo preferências).
              </li>
            </ol>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Contato do titular
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#8c8471]">
              Dúvidas sobre esta política ou exercício de direitos:
            </p>
            <Link
              href="/contato"
              className="mt-3 inline-block text-sm font-medium text-[#17827c] underline underline-offset-2"
            >
              Falar com a equipe →
            </Link>
          </Card>
        </aside>
      </div>
    </div>
  );
}
