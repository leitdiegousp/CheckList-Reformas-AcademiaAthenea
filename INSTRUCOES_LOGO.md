# 📋 INSTRUÇÕES: Como Adicionar o Logo ao Checklist

## ✅ PASSO A PASSO:

### 1️⃣ Salvar a Imagem do Logo

**Opção A - Clique com botão direito:**
1. Clique com o botão direito na primeira imagem (logo colorido com as chamas)
2. Selecione "Salvar imagem como..." ou "Save image as..."
3. Salve com o nome exato: `logo-athenea.png`
4. Salve na mesma pasta do `index.html`:
   ```
   /media/diego/Users/Diego/Documents/Gnosis PC/Diocese SC-Sul/Academia Athenea/Reformas Academia/
   ```

**Opção B - Baixar via terminal:**
Se você tiver o URL da imagem, pode usar:
```bash
cd "/media/diego/Users/Diego/Documents/Gnosis PC/Diocese SC-Sul/Academia Athenea/Reformas Academia"
# Cole aqui o comando para baixar a imagem
```

---

## 📐 ESPECIFICAÇÕES DO LOGO:

- **Nome do arquivo:** `logo-athenea.png`
- **Tamanho recomendado:** 400x400px ou maior (será redimensionado automaticamente)
- **Formato:** PNG (com fundo transparente é melhor)
- **Localização:** Mesma pasta do index.html

---

## 🎨 DESIGN IMPLEMENTADO:

✅ **Cabeçalho azul com gradiente** (#1e3c72 → #2a5298)
✅ **Logo centralizado** no topo (150px no desktop, 100px no mobile)
✅ **Título em branco** abaixo do logo
✅ **Sombra suave** no logo para destacar
✅ **Responsivo** - ajusta automaticamente no celular

---

## 🧪 APÓS SALVAR A IMAGEM:

1. Abra o terminal e execute:
```bash
cd "/media/diego/Users/Diego/Documents/Gnosis PC/Diocese SC-Sul/Academia Athenea/Reformas Academia"
git add logo-athenea.png index.html
git commit -m "➕ Adiciona logo da Academia Athenea no cabeçalho"
git push origin master
```

2. Aguarde 1-2 minutos e acesse:
   https://leitdiegousp.github.io/CheckList-Reformas-AcademiaAthenea/

---

## ❓ PROBLEMAS COMUNS:

### "A imagem não aparece"
- Verifique se o arquivo se chama exatamente `logo-athenea.png` (minúsculas)
- Confirme que está na mesma pasta do index.html
- Dê Ctrl+F5 no navegador para limpar o cache

### "A imagem está muito grande/pequena"
O CSS já está configurado para ajustar automaticamente:
- Desktop: max-width 150px
- Mobile: max-width 100px

---

## 📱 VISUAL FINAL:

```
┌─────────────────────────────────┐
│     [LOGO COLORIDO AQUI]        │
│                                  │
│  CHECK LIST REFORMAS, SERVIÇOS  │
│  E CONSERTOS - ACADEMIA ATHENEA │
└─────────────────────────────────┘
```

Cabeçalho azul com bordas arredondadas, logo no centro, título branco! 🎨
