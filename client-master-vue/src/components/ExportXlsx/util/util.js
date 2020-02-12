export const groupBySum = (items, groupByProp, sumProp) => {
    var groups = new Map();
    for (const item of items) {
      if (item[groupByProp] && item[sumProp]) {
        const groupBy = item[groupByProp];
        if (groups.has(groupBy)) {
          const currentValue = groups.get(groupBy);
          groups.set(groupBy, currentValue + item[sumProp]);
        } else {
          groups.set(groupBy, item[sumProp]);
        }
      }
    }
    const sums = [];
    for (const [key, value] of groups) {
      sums.push({
        [groupByProp]: key,
        [sumProp]: value
      });
    }
    return sums;
  };

export const withCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const columnMappings = {
    "Nomor PD" : "nomor_pd",
    "Jumlah" : "qty",
    "Kode Material" : "kode_mat",
    "Deskripsi" : "desc_mat",
    "Jumlah Routing" : "total_routing",
    "UOM" : "uom",
    "LOT" : "lot",
    "Jumlah Yield" : "yield_qty",
    "Jumlah Scrap" : "scrap_qty",
    "Tanggal Mulai" : "tanggal_mulai_baru",
    "Jam Mulai" : "start_time",
    "Tanggal Selesai" : "tanggal_selesai_baru",
    "Jam Selesai" : "end_time",
    "Terkirim" : "is_send",
    "Status" : "status",
    "Nomor Routing" : "nomor_routing",
    "All Time" : "all_time_baru",
    "ID" : "id",
    "Nama Routing" : "nama_routing",
    "Rework" : "rework",
    "Reason" : "reason",
    "Jam Update" : "updated_time",
    "NPP" : "npp",
    "Nama" : "nama",
    "Labor" : "labor",
    "Final Time" : "final_time_baru",
    "Mesin" : "mesin",
    "Overhead" : "overhead",
    "Plant" : "plant",
    "Satuan" : "satuan",
    "Work Center" : "work_center",
    "Kali" : "kali",
    "Urutan PD" : "urutan_pd",

}

const objectToArray = (dataObject) => {
    return Object.keys(dataObject).map(idx => dataObject[idx]);
}

const extractColumns = (columnsObject) => {
    const columns = objectToArray(columnsObject);
    const columnNames = columns.map(obj => columnMappings[obj.value]);
    return columnNames;
}

export const extractSheetData = (excelData) => {
    const rawData = JSON.parse(JSON.stringify(excelData));
    const sheet = rawData.sheets[Object.keys(rawData.sheets)[rawData.activeSheetIndex]];
    const data = objectToArray(sheet.data.dataTable);
    // since we're expecting column names as a frozen first row, let's extract them
    // and map them back to our data property names so we'll be able to reflect the new
    // data back to the Vuex store.
    //console.dir(columnObject);
    const columnNames = extractColumns(data.shift());
    const newSheetData = [];

    for (const row of data) {
        const rowData = {};
        const rowArray = objectToArray(row);
        rowArray.forEach((val, idx) => {
            rowData[columnNames[idx]] = val.value;
        });
        newSheetData.push(rowData);
    }

    return newSheetData;
}