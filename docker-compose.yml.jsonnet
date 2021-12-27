local ddb = import 'ddb.docker.libjsonnet';

local domain_ext = std.extVar("core.domain.ext");
local domain_sub = std.extVar("core.domain.sub");

local domain = std.join('.', [domain_sub, domain_ext]);

ddb.Compose({
    services: {
        node: ddb.Build("node") +
            ddb.User() +
            ddb.Binary("node", "/app", "node", exe=true) +
            ddb.Binary("npm", "/app", "npm", exe=true) +
            ddb.Binary("npx", "/app", "npx", exe=true) +
            ddb.Binary("ncu", "/app", "ncu", exe=true) +
            ddb.Binary("nest", "/app", "nest", exe=true) +
            ddb.Binary("typeorm", "/app", "typeorm", exe=true) +
            (if ddb.env.is("dev") then ddb.VirtualHost("8080", ddb.domain, "main") else {}) +
                {
                    volumes+: [
                        ddb.path.project + ":/app",
                        "node-cache:/home/node/.cache",
                        "node-npm-packages:/home/node/.npm-packages"
                    ],
                    tty: true
                },
        db: ddb.Build("db") +
            ddb.Expose("27017") +
            ddb.User() +
            {
                environment+: {MONGO_INITDB_ROOT_USERNAME: "mongodb"} +
                              {MONGO_INITDB_ROOT_PASSWORD: "mongodb"},
                volumes+: [
                    ddb.path.project + "/database:/data/db"
                    ],
                    tty: true
            }
    }
})