// importar as bibliotecas que iremos utilizar

const { Sequelize, Model, DataTypes } = require("sequelize");

//abrindo conexão com banco
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "empresa.sqlite",
});
//definindo a classe setor

class Setor extends Model {
  static init(sequelize) {
    super.init(
      {
        idsetor: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        ramal: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(30),
        },
      },
      { sequelize, modelname: "setor", tableName: "setores" })
  }
}
//inicialização do modelo create table setor 
Setor.init(sequelize);

//definindo a classe funcionario
class Funcionario extends Model{
  static init(sequelize){
    super.init({
      matricula: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      idsetor: {
        type: DataTypes.INTEGER,
        references: {
          model: Setor,
          key: 'idsetor'
        },
        referencesKey: 'idsetor',
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      nascimento: {
        type: DataTypes.DATE
      },
      telefone: {
        type: DataTypes.STRING(15),
      }
    }, {sequelize, modelName: 'funcionario', tableName: 'funcionarios'})
  }
}

Funcionario.init(sequelize);

//sincronismo
(async () => {
  await sequelize.sync({ force: true });
  //Usando o CREATE
  const setor_create = await Setor.create({ nome: "Financeiro", ramal: "2134", email: "financeiro@empresa.com"});
  const setor_create_S = await Setor.create({ nome: "Secretaria", ramal: "2135", email: "secretaria@empresa.com"});
  const setor_create_P = await Setor.create({ nome: "Portaria", ramal: "2136", email: "portaria@empresa.com"});

//READ - Listar objetos
  const setores_listar = await Setor.findAll();

  console.log("Lista de setores: \n", JSON.stringify(setores_listar, null, 2), "\n\n");
  
})();
