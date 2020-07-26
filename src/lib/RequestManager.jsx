import request from "axios";

export default {
  /**
   * Retrieve list of entities from server using AJAX call.
   *
   * @returns {Promise} - Result of ajax call.
   */
  fetchEntities(url) {
    return request({
      method: "GET",
      url,
      responseType: "json",
    });
  },

  submitEntity(url, entity, multipart = false) {
    return request({
      method: "POST",
      url,
      responseType: "json",
      data: entity,
    });
  },

  updateEntity(url, entity) {
    return request({
      method: "PUT",
      url,
      responseType: "json",
      data: entity,
    });
  },

  deleteEntity(url, entity) {
    return request({
      method: "DELETE",
      url,
      responseType: "json",
      data: entity,
    });
  },
};
