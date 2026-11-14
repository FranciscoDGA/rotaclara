"use client";

/**
 * =====================================================================
 * RotaClara — Formulário de contato
 * ---------------------------------------------------------------------
 * Não há backend: o formulário monta um `mailto:` e abre o cliente de
 * e-mail do usuário. Nenhum dado é enviado ou armazenado por nós.
 * =====================================================================
 */

import { useState } from "react";
import { Button, Field, Input, Select, Textarea } from "@/components/ui/primitives";

const CONTACT_EMAIL = "contato@rotaclara.com.br";

const SUBJECTS = [
  "Correção de conteúdo",
  "Sugestão de destino",
  "Metodologia e fontes",
  "Parceria",
  "Outro assunto",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0] ?? "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "error">("idle");

  const invalidEmail = email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim() || invalidEmail) {
      setStatus("error");
      return;
    }
    setStatus("idle");

    const body = [
      message.trim(),
      "",
      "—",
      `Nome: ${name.trim()}`,
      `E-mail: ${email.trim()}`,
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `[RotaClara] ${subject}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
      noValidate
    >
      {status === "error" && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-[#f6c9c9] bg-[#fdeaea] p-4"
        >
          <p className="text-sm font-semibold text-[#a32b2b]">
            Preencha os campos obrigatórios
          </p>
          <p className="mt-1 text-sm text-[#a32b2b]">
            Nome, e-mail válido e mensagem são necessários para montar o
            e-mail.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <Field label="Seu nome" htmlFor="ct-nome">
          <Input
            id="ct-nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como devemos te chamar"
          />
        </Field>

        <Field label="Seu e-mail" htmlFor="ct-email" hint="Para conseguirmos responder.">
          <Input
            id="ct-email"
            type="email"
            value={email}
            invalid={invalidEmail}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
          />
        </Field>

        <Field label="Assunto" htmlFor="ct-assunto">
          <Select
            id="ct-assunto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Mensagem" htmlFor="ct-mensagem">
          <Textarea
            id="ct-mensagem"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Conte o que você precisa. Se for uma correção, indique a página."
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs leading-relaxed text-[#8c8471]">
          Ao enviar, seu aplicativo de e-mail será aberto com a mensagem
          pronta. Nenhum dado passa por este site.
        </p>
        <Button type="submit" size="lg">
          Abrir e-mail
        </Button>
      </div>
    </form>
  );
}
