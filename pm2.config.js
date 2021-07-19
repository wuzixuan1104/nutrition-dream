
module.exports = {
  apps : [
    {
      name: 'dev',

      max_memory_restart: '512M',

      script: 'yarn',
      args:"start",


      log_file: 'pm2-logs/Server.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    },
    {
      name: 'production',

      max_memory_restart: '512M',

      script: 'yarn',
      args:"start",

      log_file: 'pm2-logs/Server.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
}
