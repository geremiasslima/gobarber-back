# Recuperação de senha

**Regra Funcional(RF)**

- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber um e-mail  com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Regra Não Funcional(RNF)**

- Utilizar Mailtrap para testar os envios de e-mail em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O Envio de e-mails deve acontecer em segundo plano(background job);

**Regra de Negócios(RN)**

- O link enviado pelo e-mail para resetar senha, deve expirar em 2h;
- o usuário precisa confirmar a nova senha ao resetar a sua senha;

# Atualização do Perfil

**Regra Funcional(RF)**

- O usuário deve poder atualizar seu nome, e-mail e senha;


**Regra de Negócios(RN)**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário precisa confirmar a nova senha;



# Painel do prestador

**Regra Funcional(RF)**

- o usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações nao lidas;

**Regra Não Funcional(RNF)**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regra de Negócios(RN)**

- a notificação deve ter um status de lida ou não lida para que o prestador possa controlar;


# Agendamento de serviços

**Regra Funcional(RF)**

- o usuário deve poder listar todos os prestadores de serviço cadastrado;
- o usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- o usuário deve poder listar horário específico de um prestador;
- o usuário deve poder realizar um novo agendamento com um prestador

**Regra Não Funcional(RNF)**

- A listagem de prestadores deve ser armazenada em cache;

**Regra de Negócios(RN)**

- Cada agendamento deve durar uma hora;
- Os agendamentos disponíveis devem estar entre as 8hs às 18hs (Primeiro às 8hs, último às 17hs);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;



