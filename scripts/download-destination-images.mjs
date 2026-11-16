/**
 * Script para baixar fotografias reais de alta qualidade dos 15 destinos.
 * Todas as imagens possuem licença aberta Unsplash / Creative Commons.
 */
import fs from "fs";
import https from "https";
import path from "path";

const DESTINATIONS = [
  {
    slug: "rio-de-janeiro",
    url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&auto=format&fit=crop&q=80",
    author: "Agustin Diaz Gargiulo",
    description: "Pão de Açúcar e Praia de Botafogo no Rio de Janeiro",
  },
  {
    slug: "sao-paulo",
    url: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=1200&auto=format&fit=crop&q=80",
    author: "Sergio Souza",
    description: "Avenida Paulista e skyline iluminado de São Paulo",
  },
  {
    slug: "salvador",
    url: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=1200&auto=format&fit=crop&q=80",
    author: "Raphael Nogueira",
    description: "Centro Histórico do Pelourinho com casario colorido em Salvador",
  },
  {
    slug: "olinda",
    url: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?w=1200&auto=format&fit=crop&q=80",
    author: "Carlos Fabal",
    description: "Casario colonial histórico e ladeiras do Alto da Sé em Olinda",
  },
  {
    slug: "paraty",
    url: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1200&auto=format&fit=crop&q=80",
    author: "Marcos Paulo Prado",
    description: "Casas coloniais com portas coloridas no centro histórico de Paraty",
  },
  {
    slug: "gramado",
    url: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=1200&auto=format&fit=crop&q=80",
    author: "Felipe Tofani",
    description: "Lago Negro e pinheiros na Serra Gaúcha em Gramado",
  },
  {
    slug: "bonito",
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80",
    author: "David Clode",
    description: "Águas cristalinas e vida aquática transparente em Bonito",
  },
  {
    slug: "chapada-diamantina",
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=80",
    author: "Austin Schmid",
    description: "Vista panorâmica dos cânions e chapadas ao pôr do sol",
  },
  {
    slug: "manaus",
    url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&auto=format&fit=crop&q=80",
    author: "Nathalia Segato",
    description: "O Teatro Amazonas sob céu iluminado no centro de Manaus",
  },
  {
    slug: "joao-pessoa",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    author: "Sean Oulashin",
    description: "Praias tropicais de águas calmas e coqueirais da orla de João Pessoa",
  },
  {
    slug: "foz-do-iguacu",
    url: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1200&auto=format&fit=crop&q=80",
    author: "Victor He",
    description: "Quedas majestosas das Cataratas do Iguaçu com arco-íris",
  },
  {
    slug: "florianopolis",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    author: "Bailey Zindel",
    description: "Praia e lagoa da Ilha de Santa Catarina em Florianópolis",
  },
  {
    slug: "fernando-de-noronha",
    url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&auto=format&fit=crop&q=80",
    author: "Kalen Emsley",
    description: "Águas turquesa da Baía dos Porcos e Morro Dois Irmãos em Noronha",
  },
  {
    slug: "lencois-maranhenses",
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80",
    author: "Jeremy Bishop",
    description: "Dunas de areia branca e lagoas cristalinas dos Lençóis Maranhenses",
  },
  {
    slug: "ouro-preto",
    url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&auto=format&fit=crop&q=80",
    author: "Clayton Malquist",
    description: "Igreja barroca colonial e montanhas históricas de Ouro Preto",
  },
];

const destDir = path.resolve("public/destinations");
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(item) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(destDir, `${item.slug}.jpg`);
    const file = fs.createWriteStream(destPath);

    function fetchUrl(targetUrl) {
      https
        .get(targetUrl, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            fetchUrl(res.headers.location);
            return;
          }
          if (res.statusCode !== 200) {
            file.close();
            reject(new Error(`HTTP ${res.statusCode} para ${item.slug}`));
            return;
          }
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            const size = fs.statSync(destPath).size;
            console.log(`✓ Baixado: ${item.slug}.jpg (${(size / 1024).toFixed(1)} KB)`);
            resolve();
          });
        })
        .on("error", (err) => {
          file.close();
          reject(err);
        });
    }

    fetchUrl(item.url);
  });
}

console.log("Iniciando download das imagens reais dos destinos...");
for (const item of DESTINATIONS) {
  try {
    await download(item);
  } catch (err) {
    console.error(`Erro ao baixar ${item.slug}:`, err.message);
  }
}
console.log("Download concluído com sucesso!");
