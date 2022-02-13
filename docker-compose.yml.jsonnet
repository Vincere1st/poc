local ddb = import 'ddb.docker.libjsonnet';

ddb.Compose(
    ddb.with(import '.docker/node/djp.libjsonnet',
        append=
            (if ddb.env.is("dev") then ddb.VirtualHost("8080", ddb.domain, "frontend") else {})
            + (if ddb.env.is("dev") then ddb.VirtualHost("3000", ddb.subDomain("api"), "backend") else {})
            + ddb.Expose(9229)
            + ddb.Expose(8080)
            + ddb.Expose(1883, null,"tcp")
            + ddb.Binary("typeorm", "/project", "/project/core/node_modules/.bin/ts-node --transpile-only /project/core/node_modules/typeorm/cli.js", exe=true, condition='project_cwd.startswith("backend")')
            + ddb.Binary("ts-node", "/project", "/project/core/node_modules/.bin/ts-node", exe=true, condition='project_cwd.startswith("core")')
            + {
                  environment+: if ddb.env.is("dev") then [
                      'NODE_ENV=dev',
                  ] else [
                      'NODE_ENV=stage',
                  ]
              }
        )

    + ddb.with(import '.docker/node/djp.libjsonnet',
        name="node-dist",
        params={
            exe: false,
            binaries: false
        },
        append={
            command: 'node dist/src/main',
            working_dir: '/project/core'
        },
        when=!ddb.env.is('dev'))

    + ddb.with(import '.docker/httpd/djp.libjsonnet',
        params={vhost: "/.docker/httpd/vhost.conf"},
        append=ddb.VirtualHost("80", ddb.domain, "dist-frontend") + ddb.VirtualHost("80", ddb.subDomain("api"), "dist-backend"),
        when=!ddb.env.is('dev')
        )

    + ddb.with(import '.docker/db/djp.libjsonnet')
    + ddb.with(import '.docker/mqtt/djp.libjsonnet',
        append=
            (if ddb.env.is("dev") then ddb.VirtualHost("1883", ddb.subDomain("mqtt"), "mqtt") else {})
    )
    + ddb.with(import '.docker/zigbee2mqtt/djp.libjsonnet',
        append =
            (if ddb.env.is("dev") then ddb.VirtualHost("8081", ddb.subDomain("z2m"), "z2m") else {})
            + {
            environment+: [
            'ZIGBEE2MQTT_CONFIG_MQTT_BASE_TOPIC=zigbee2mqtt',
            'ZIGBEE2MQTT_CONFIG_MQTT_SERVER=mqtt://mqtt.poc.test:16384',
            'ZIGBEE2MQTT_CONFIG_SERIAL_PORT=/dev/ttyACM0',
            'ZIGBEE2MQTT_CONFIG_FRONTEND_PORT=8081',
            'ZIGBEE2MQTT_CONFIG_FRONTEND_HOST=localhost',
            'ZIGBEE2MQTT_CONFIG_PERMIT_JOIN=false',
            ]
        }
    )
    + ddb.with(import '.docker/nginx/djp.libjsonnet',
        append=ddb.VirtualHost("80", ddb.subDomain("z2m"), "z2m")
    )
)