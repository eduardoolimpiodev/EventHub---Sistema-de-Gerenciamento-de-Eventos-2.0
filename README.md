# 🎉 EventHub - Sistema de Gerenciamento de Eventos 2.0

Aplicação moderna de descoberta e gerenciamento de eventos construída com **Next.js 14+**, **TypeScript** e **Ticketmaster Discovery API**.

## 📋 Sobre o Projeto

EventHub é uma plataforma completa para descobrir, buscar e salvar eventos de entretenimento. Este projeto representa uma migração completa de React para Next.js 14+, implementando todas as melhores práticas e recursos modernos do framework.

## ✨ Funcionalidades

- 🔍 **Busca de Eventos**: Sistema de busca com filtros avançados (cidade, categoria, datas)
- 📅 **Listagem de Eventos**: Grid responsivo com cards informativos
- 📝 **Detalhes do Evento**: Página completa com todas as informações, mapa de assentos e contagem regressiva
- ❤️ **Favoritos**: Sistema para salvar até 5 eventos favoritos com persistência local
- 🎨 **UI Moderna**: Interface limpa e responsiva com Tailwind CSS
- ⚡ **Performance**: Otimizações com ISR, SSG e next/image

## 🚀 Tecnologias Utilizadas

### Core
- **Next.js 14.2+** - Framework React com App Router
- **React 18.3+** - Biblioteca UI
- **TypeScript 5+** - Tipagem estática

### Estado e Dados
- **Zustand 5+** - Gerenciamento de estado global
- **Ticketmaster Discovery API** - Fonte de dados de eventos

### Estilização
- **Tailwind CSS 3.4+** - Framework CSS utility-first
- **PostCSS** - Processamento CSS

### Qualidade de Código
- **ESLint** - Linting
- **TypeScript Strict Mode** - Verificação de tipos rigorosa

## 📁 Estrutura do Projeto

```
src/
├── app/                          # App Router do Next.js
│   ├── layout.tsx               # Layout raiz com Navbar e Footer
│   ├── page.tsx                 # HomePage (ISR - revalidate: 3600s)
│   ├── loading.tsx              # Loading UI global
│   ├── error.tsx                # Error UI global
│   ├── buscar/                  # Página de busca
│   │   ├── page.tsx            # Client-side com filtros e paginação
│   │   └── loading.tsx         # Loading skeleton
│   ├── salvos/                  # Eventos salvos
│   │   └── page.tsx            # Client-side com Zustand
│   └── evento/[id]/             # Detalhes do evento
│       ├── page.tsx            # SSG com generateStaticParams
│       ├── loading.tsx         # Loading skeleton
│       └── not-found.tsx       # 404 customizado
├── components/                  # Componentes reutilizáveis
│   ├── navbar.tsx              # Navegação principal
│   ├── event-card.tsx          # Card de evento
│   ├── search-bar.tsx          # Barra de busca com debounce
│   ├── event-filters.tsx       # Filtros de busca
│   ├── event-countdown.tsx     # Contagem regressiva
│   └── save-event-button.tsx   # Botão de salvar evento
├── lib/                         # Utilitários e serviços
│   ├── ticketmaster-api.ts     # Cliente da API
│   └── helpers.ts              # Funções auxiliares
├── store/                       # Estado global
│   └── saved-events.ts         # Store Zustand para eventos salvos
└── types/                       # Definições TypeScript
    └── event.ts                # Tipos da API Ticketmaster
```

## 🎯 Rendering Strategies

### HomePage (`/`)
- **Estratégia**: ISR (Incremental Static Regeneration)
- **Revalidação**: 3600 segundos (1 hora)
- **Motivo**: Conteúdo semi-estático que pode ser cacheado, mas precisa de atualizações periódicas

### SearchPage (`/buscar`)
- **Estratégia**: Client-Side Rendering
- **Motivo**: Interatividade em tempo real com filtros, busca e paginação

### EventDetailsPage (`/evento/[id]`)
- **Estratégia**: SSG (Static Site Generation) com `generateStaticParams`
- **Motivo**: Páginas estáticas para os 20 eventos mais populares, com fallback para eventos não pré-renderizados

### SavedEventsPage (`/salvos`)
- **Estratégia**: Client-Side Rendering
- **Motivo**: Dados locais do usuário gerenciados com Zustand

## 🐛 Bugs Corrigidos da Versão Anterior

### 1. **API Key Hardcoded**
- ❌ **Antes**: API key exposta no código
- ✅ **Depois**: Variável de ambiente `NEXT_PUBLIC_TICKETMASTER_API_KEY`

### 2. **Debounce com Memory Leak**
- ❌ **Antes**: `setTimeout` sem cleanup adequado
- ✅ **Depois**: Implementação correta com cleanup no `useEffect`

### 3. **Context API Ineficiente**
- ❌ **Antes**: Re-renders desnecessários com Context API
- ✅ **Depois**: Zustand com seletores otimizados

### 4. **Formatação de Preço Inconsistente**
- ❌ **Antes**: Formatação manual propensa a erros
- ✅ **Depois**: `Intl.NumberFormat` para formatação consistente

### 5. **Tipagem Fraca**
- ❌ **Antes**: JavaScript sem tipos
- ✅ **Depois**: TypeScript strict mode com interfaces completas

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- API Key da Ticketmaster ([obter aqui](https://developer.ticketmaster.com/))

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd EventHub---Sistema-de-Gerenciamento-de-Eventos-2.0
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Adicione sua API key no `.env.local`:
```env
NEXT_PUBLIC_TICKETMASTER_API_KEY=sua_api_key_aqui
```

5. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse http://localhost:3000

## 📜 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
```

## 🎨 Features Implementadas

### Obrigatórias ✅
- [x] Next.js 14+ com App Router
- [x] TypeScript em todos os arquivos
- [x] Rendering strategies (SSG, ISR, CSR)
- [x] Zustand para gerenciamento de estado
- [x] next/image para otimização de imagens
- [x] Metadata API para SEO
- [x] Dynamic routes (`/evento/[id]`)
- [x] Loading e Error states
- [x] Tailwind CSS
- [x] Integração com Ticketmaster API

### Diferenciais ✅
- [x] TypeScript strict mode
- [x] Componentes reutilizáveis bem estruturados
- [x] Error boundaries customizados
- [x] Loading skeletons
- [x] Commits organizados e descritivos
- [x] Documentação técnica completa
- [x] Correção de todos os bugs identificados

## 🔐 Variáveis de Ambiente

```env
NEXT_PUBLIC_TICKETMASTER_API_KEY=your_api_key_here
```

## 🚀 Deploy

O projeto está pronto para deploy em plataformas como:
- **Vercel** (recomendado)
- **Netlify**
- **AWS Amplify**

## 📝 Decisões Técnicas

### Por que Zustand?
- Menor bundle size que Redux
- API simples e intuitiva
- Excelente performance com seletores
- Persistência fácil com middleware

### Por que ISR na HomePage?
- Balance entre performance e atualização de dados
- Cache eficiente com revalidação automática
- Melhor experiência do usuário

### Por que SSG nos Detalhes?
- SEO otimizado para eventos populares
- Carregamento instantâneo
- Menor carga no servidor

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto foi desenvolvido como teste técnico.

## 👨‍💻 Autor

Desenvolvido com ❤️ para demonstrar habilidades em Next.js 14+ e TypeScript.

---

**Nota**: Este projeto utiliza a Ticketmaster Discovery API. Certifique-se de ter uma API key válida para utilizar todas as funcionalidades.
