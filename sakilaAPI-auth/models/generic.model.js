import {sakilaDB} from '../config/database.config.js';

export default function (tableName, idField){
    return {
        findAll(){
            return sakilaDB(tableName);
        },

        findWithID(id){
            return sakilaDB(tableName).where(idField, id);
        },

        add(entity){
            return sakilaDB(tableName).insert(entity);
        },

        update(id, entity){
            return sakilaDB(tableName).where(idField, id).update(entity);
        },

        delete(id){
            return sakilaDB(tableName).where(idField, id).delete();
        }
    }
}
