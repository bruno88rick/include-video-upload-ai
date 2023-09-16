import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany()

  await prisma.prompt.create({
    data: {
      title: 'Gerar Títulos para o YouTube',
      template: `Seu papel é gerar três títulos para um vídeo do YouTube.

Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar os títulos.
Abaixo você também receberá uma lista de títulos, use essa lista como referência para os títulos a serem gerados.

Os títulos devem ter no máximo 60 caracteres.
Os títulos devem ser chamativos e atrativos para maximizar os cliques.

Retorne APENAS os três títulos em formato de lista como no exemplo abaixo:
'''
- Título 1
- Título 2
- Título 3
'''

Transcrição:
'''
{transcription}
'''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Gerar Descrição para o YouTube',
      template: `Seu papel é gerar uma descrição sucinta para um vídeo do YouTube.
  
Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar a descrição.

A descrição deve possuir no máximo 80 palavras em primeira pessoa contendo os pontos principais do vídeo.

Use palavras chamativas e que cativam a atenção de quem está lendo.

Além disso, no final da descrição inclua uma lista de 3 até 10 hashtags em letra minúscula contendo palavras-chave do vídeo.

O retorno deve seguir o seguinte formato:
'''
Descrição.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcrição:
'''
{transcription}
'''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Gerar Capítulos para o YouTube',
      template: `Seu papel é gerar capítulos para um vídeo do YouTube.

Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar os capítulos, com base nos assuntos falados.
Abaixo você também receberá uma lista de títulos, use essa lista como referência para os capítulos a serem gerados.

Os capítulos devem ter no máximo 60 caracteres.
Os capítulos devem ser chamativos e atrativos para maximizar os cliques.

Retorne os capítulos em formato de lista como no exemplo abaixo:
'''
- Capítulo 1
- Capítulo 2
- Capítulo 3
'''

Transcrição:
'''
{transcription}
'''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Resumir o Video',
      template: `Seu papel é resunir um vídeo.

Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para fazer um resumo do que está sendo falado.

O resumo devem ter no máximo 1000 caracteres.

Transcrição:
'''
{transcription}
'''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Pedido Personalizado para a IA',
      template: `Digite aqui o que você deseja perguntar para a IA sobre o vídeo (Não esqueça de deletar esta frase e mantenha tudo que está escrito de Transcrição pra baixo).





Transcrição:
'''
{transcription}
'''`.trim()
    }
  })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })