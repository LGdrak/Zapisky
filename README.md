# Zapisky
Maturitní projekt pro ukládání zápisků na servru.

## Jak spustit:
1. Naklonujte se do našeho git repozitáře. Do větve devel: ```git clone -b devel --single-branch --depth 1 https://github.com/LGdrak/Zapisky.git```
2. otevřete terminál a dostaňte se do lokace projektu Zapisky.
   
3. přesuňte se do složky backend a vytvořte python virtuální prostředí:
   ```python -m venv env```
   
   a pro spuštění použijte:
   Windows: ```env\Scripts\activate```
   Linux/macOS: ```source env/bin/activate```

   env můžete nahradit jakýmkoli jménom prostředí

   dále instalujte uvicorn a fast api příkazem: ```pip install fastapi "uvicorn[standard]"```

   niní lze aplikace spustit z cesty Zapisky/backend/app příkazem: ```uvicorn main:app --reload```

4. přesuňte se do složky frontend: ```cd ../frontend``` a instalujte příkazem: ```sudo dnf install nodejs``` - pro fedoru/linux

   ```winget install OpenJS.NodeJS.LTS``` - pro windows

   ```brew install node``` - pro mac
   
   dále instalujte balíčky pro development frontendu: ```npm install```

   teď už by měl jít spustit i frontend příkazem: ```npm run dev```
