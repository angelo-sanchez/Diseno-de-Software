# Diseno-de-Software

Tienen que tener instalados la última versiónd de nodejs.

1. Clonar repositorio GitHub
    git clone https://github.com/facuhrodriguez/Diseno-de-Software.git
    cd Diseno-de-Software
    
2. Ejecutar en una consola npm install para que instale todos los componentes de node.
3. Crear un archivo .env en la raíz del proyecto con estos valores.

        # NODE
        NODE_ENV=development
        PORT=3000
        BASE_URL= http://localhost:3000
        # Cors whitelist
        CORS_WHITELIST=http://localhost:4200

        #DB
        MONGO_DB_URI=mongodb+srv://Guichi:hola1234@cluster0.clby5.gcp.mongodb.net/apiBD?retryWrites=true&w=majority
        MONGO_DB_LOG=1
        
4. Ejecutar en consola npm run start:reload
      Si todo salió bien deberían ver un mensaje en la consola "Server listening in port 3000"
