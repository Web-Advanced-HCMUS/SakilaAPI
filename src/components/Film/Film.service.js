import db from '../../connection.js';
import { errorMessage } from '../../utils/error.js';

import { FILM_RATING } from '../../utils/constant.js';

const TABLE_NAME = 'film';

export async function getAllFilmService() {
  try {
    const query = `select * from ${TABLE_NAME}`;

    const [rows, fields] = await db.query(query);

    if (!Array.isArray(rows) || !rows.length) return errorMessage(404, 'NOT FOUND!');

    return rows;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function getOneFilmByNameService(name) {
  try {
    const query = `select * from ${TABLE_NAME} where title REGEXP '${name}'`;
    const [rows, fields] = await db.query(query);

    if (!Array.isArray(rows) || !rows.length) return errorMessage(404, 'NOT FOUND!');

    return rows;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function addOneFilmService(body) {
  try {
    let specialFeatures = '';
    if (body?.specialFeatures) {
      const array = body?.specialFeatures;
      const len = body?.specialFeatures.length;
      for (let i = 0; i < len; i += 1) {
        if (i < len - 1) specialFeatures += `${array[i]},`;
        else specialFeatures += array[i];
      }
    }

    const data = {
      title: body?.title,
      description: body?.description,
      release_year: body?.releaseYear,
      language_id: body?.languageId,
      original_language_id: body?.originalLanguageId,
      rental_duration: body?.rentalDuration,
      length: body?.length,
      replacement_cost: body?.replacementCost,
      rating: FILM_RATING[body?.rating],
      special_features: specialFeatures === '' ? null : `${specialFeatures}`
    };

    const checkLanguageIdQuery = `select * from language where language_id=${data.language_id}`;
    const [languageIds, languageFields] = await db.query(checkLanguageIdQuery);
    if (!languageIds[0]) return errorMessage(404, 'LANGUAGE ID NOT FOUND!');

    if (body?.originalLanguageId) {
      const checkOriginLanguageIdQuery = `select * from language where language_id=${data.original_language_id}`;
      const [originLanguageIds, originLanguageFields] = await db.query(checkOriginLanguageIdQuery);
      if (!originLanguageIds[0]) return errorMessage(404, 'ORIGINAL LANGUAGE ID NOT FOUND!');
    }

    const addFilmQuery = `insert into ${TABLE_NAME} set ?`;
    await db.query(addFilmQuery, data);

    return true;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function deleteOneByIdService(id) {
  try {
    const checkExistQuery = `select film_id from ${TABLE_NAME} where film_id=${id}`;
    const [findId, idFields] = await db.query(checkExistQuery);
    if (!findId[0]) return errorMessage(404, 'FILM ID NOT FOUND!');

    const query = `delete from ${TABLE_NAME} where film_id=${id}`;

    await db.query(query);

    return true;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function updateOneByIdService(id, body) {
  try {
    let specialFeatures = '';
    if (body?.specialFeatures) {
      const array = body?.specialFeatures;
      const len = body?.specialFeatures.length;
      for (let i = 0; i < len; i += 1) {
        if (i < len - 1) specialFeatures += `${array[i]},`;
        else specialFeatures += array[i];
      }
    }

    const data = {
      title: body?.title,
      description: body?.description,
      release_year: body?.releaseYear,
      language_id: body?.languageId,
      original_language_id: body?.originalLanguageId,
      rental_duration: body?.rentalDuration,
      length: body?.length,
      replacement_cost: body?.replacementCost,
      rating: FILM_RATING[body?.rating],
      special_features: specialFeatures === '' ? null : `${specialFeatures}`
    };
    const checkExistQuery = `select film_id from ${TABLE_NAME} where film_id=${id}`;
    const [findId, idFields] = await db.query(checkExistQuery);
    if (!findId[0]) return errorMessage(404, 'FILM ID NOT FOUND!');

    const checkLanguageIdQuery = `select * from language where language_id=${data.language_id}`;
    const [languageIds, languageFields] = await db.query(checkLanguageIdQuery);
    if (!languageIds[0]) return errorMessage(404, 'LANGUAGE ID NOT FOUND!');

    if (body?.originalLanguageId) {
      const checkOriginLanguageIdQuery = `select * from language where language_id=${data.original_language_id}`;
      const [originLanguageIds, originLanguageFields] = await db.query(checkOriginLanguageIdQuery);
      if (!originLanguageIds[0]) return errorMessage(404, 'ORIGINAL LANGUAGE ID NOT FOUND!');
    }

    const condition = { film_id: id };

    const updateQuery = `update ${TABLE_NAME} set ? where ?`;
    await db.query(updateQuery, [data, condition]);

    return true;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}
