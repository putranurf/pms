var pg = require("pg");
 
const config = {
  user: 'ekifakhrureza',
  host: '192.168.11.79',
//   database: 'pmsdb',
  database: 'pmsdb-dev',
  password: 'initial01',
  port: 5432
};

const pool = new pg.Pool(config);

module.exports = {


    //Menampilkan Daftar Peti di Menu Unlocking Data Lot
    getPeti(req,res){
        pool.query("SELECT DISTINCT(id_peti),nomor_pd, kode_mat, desc_mat, qty  FROM tbl_peti WHERE status_pasang = 'Y' AND status_hapus is null order by id_peti", (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },
    getPetiDetail(req,res){
        var id = req.params.id
        // console.log('INI ID OLOHH'+id);
        
        pool.query('SELECT * FROM tbl_peti where id_peti=$1', [id],(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },
    getPetiDetailEdit(req,res){
        var nomor_pd = req.params.nomor_pd
        var nomor_routing = req.params.nomor_routing
        
        // console.log(id);
        
        pool.query('SELECT * FROM tbl_peti where nomor_pd=$1 and nomor_routing=$2', [nomor_pd, nomor_routing],(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },
    update(req,res){
        var nomor_routing = req.body.nomor_routing
        var nama_routing = req.body.nama_routing
        var work_center = req.body.work_center
        var nomor_pd = req.body.nomor_pd

        pool.query("UPDATE tbl_peti SET nama_routing=$2, work_center=$3 WHERE nomor_pd=$4 and nomor_routing=$1",[nomor_routing,nama_routing,work_center,nomor_pd], function (error, result) {
        // done();
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        else{
            res.status(200).json(result.rows)        
        }
        })   
    },

    //List Nomor PD di Locking Lot
    getNomorPd(req,res){
        // pool.query("SELECT * FROM tbl_mapping_routing_header WHERE NOT EXISTS (SELECT * FROM tbl_conf WHERE tbl_conf.nomor_pd = tbl_mapping_routing_header.nomor_pd) and is_deleted is null AND qty != 0 ORDER BY nomor_pd", (error, results) => {
            pool.query("select * from tbl_mapping_routing_header where curr_qty <> 0", (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },

    //Detail Nomor PD ketika di pilih dan menampilkan kode material, deskripsi material dan sisa Quantity 
    //di Menu Locking Lot
    getNomorPdDetail(req,res){
        var nomor_pd = req.params.id
        console.log(nomor_pd)
        pool.query('SELECT * FROM tbl_mapping_routing_header where nomor_pd=$1 LIMIT 1', [nomor_pd],(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },

    //Ketika Locking lot di Submit di Menu Locking Lot
    postMappingRooting(req,res){ 
        // console.log('MASUK SINI')
        var id_peti = req.body.id_peti        
        var nomor_pd = req.body.nomor_pd        
        var qty = req.body.qty        
        var timestamp = new Date().toLocaleString()
        // pool.query("DELETE FROM tbl_peti WHERE nomor_pd=$1",[nomor_pd], function (error, result) {
        // // done();
        // if (error) {
        //     console.log(error);
        //     res.status(400).send(error);
        // } else {
            pool.query('SELECT * from tbl_peti where id_peti=$1', [id_peti],(error, results3) => {
                if (results3.rows.length != 0) {
                    console.log('geus aya coy di database data na');                 
                    res.status(200).json('gagal')                                            
                } else {       
                    console.log('tah kieu data na asup, mantaap')         
                    pool.query('SELECT tmr.nomor_pd, tmr.nomor_routing,tmr.work_center, tmr.nama_routing, tmr.kali, tmrh.plant, tmrh.kode_mat, tmrh.desc_mat, tmrh.total_routing, tmrh.qty, tmrh.uom as satuan, tmr.uom, case when (select urutan_pd from tbl_peti where nomor_pd =$1 order by urutan_pd desc LIMIT 1) is null then 1 else (select urutan_pd from tbl_peti where nomor_pd =$1 order by urutan_pd desc LIMIT 1) + 1 end urutan_pd FROM tbl_mapping_routing tmr LEFT JOIN tbl_mapping_routing_header tmrh ON tmrh.nomor_pd = tmr.nomor_pd WHERE tmr.nomor_pd=$1', [nomor_pd],(error, results) => {
                        if (error) {
                            console.log('error yeuh' + error);
                            res.status(400).send(error);                            
                        } else {                
                            var counter = 0
                            console.log(results.rows)
                            results.rows.forEach(element => {                                
                                console.log(element.nomor_routing)
                                pool.query("INSERT INTO tbl_peti (id_peti, nomor_pd, kode_mat, desc_mat, total_routing, uom, qty, nomor_routing, nama_routing, status_pasang, created_time, plant, kali, work_center, satuan, urutan_pd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);",[id_peti,element.nomor_pd, element.kode_mat, element.desc_mat, element.total_routing, element.uom, qty, element.nomor_routing, element.nama_routing, 'Y' ,timestamp, element.plant, element.kali, element.work_center, element.satuan, element.urutan_pd], function (error2, results2) {        
                                    if (error2) {
                                        console.log(error2)
                                        res.status(400).send(error2)
                                    }                                                                                                  
                                })    
                                console.log('asup looping')               
                                counter++
                            });  
                            console.log('teu asup looping euy ')
                            if (counter == results.rows.length - 1) {
                                res.status(200).json(results2.rows)   
                            }                             
                        }
                    })     
                    res.status(200).json('sukses')                                   
                }
            })  
        // }
        // })
        
    },


    //Untuk Menampilkan Detail Nomor Peti yaitu Nomor PD, Kode Material
    //Deskripsi Material dan Quantity di Menu Unlocking Data Lot
    getNomorPetiDetail(req,res){
        var id_peti = req.params.id
        console.log(id_peti)
        pool.query('SELECT * FROM tbl_peti where id_peti=$1 LIMIT 1', [id_peti],(error, results) => {
            if (error) {
                console.log(error);
                if(results.rows.length == 0){
                    console.log('error euy')
                }
                // res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },

    //Ketika di submit di menu unlocking data lot
    lepas(req,res){        
        var id = req.body.id_peti
        var nomor_pd = req.body.nomor_pd
        // pool.query("UPDATE tbl_peti SET status_hapus = 'Y' , status_pasang = 'N' WHERE id_peti=$1",[id], function (error, result) {
        // // done();
        // if (error) {
        //     console.log(error);
        //     res.status(400).send(error);
        // }
        // else{
        //     res.status(200).json(result.rows)        
        // }
        // })    
        
        

        pool.query("DELETE FROM tbl_peti WHERE id_peti=$1",[id], function (error, result) {
        // done();
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {                         
                pool.query("UPDATE tbl_mapping_routing_header SET is_deleted = '1' WHERE nomor_pd=$1",[nomor_pd], function (error, result) {
                // done();
                    if (error) {
                        console.log(error);
                        res.status(400).send(error)                    
                    }
                })           
                res.status(200).json('sukses')
            }
        })
    },

    //Untuk Login PMS
    postLogin(req,res){ 
        console.log(req.body.username)
        var username = req.body.username        
        var password = req.body.password                   
        pool.query('SELECT * FROM tbl_user_auth where username=$1 and password=$2', [username,password],(error, results) => {
            if (error) {
                console.log('error yeuh' + error)
                res.status(400).send(error)
            } else {            
                // console.log(results.rows)                                    
                if(!results.rows){
                    username == results.rows[0].username && password == results.rows[0].password
                        console.log('username & pass benar')                    
                        res.status(200).send(results.rows)
                } else {
                        console.log('username atau password salah')
                        // res.send('username atau password salah')
                        res.send(results.rows)
                }
            }
        })
    },
    postDelete(req,res){        
        var id = req.body.id_peti
        pool.query("DELETE FROM tbl_peti WHERE id_peti=$1",[id], function (error, result) {
        // done();
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        else{
            res.status(200).json(result.rows)        
        }
        })   
    },

    //Ganti Password di Menu Profil Pojok Kanan Atas
    gantiPassword(req,res){
        var npp = req.body.npp
        var password_baru = req.body.password_baru
        pool.query("UPDATE tbl_user_auth SET password=$2 WHERE npp=$1",[npp,password_baru], function (error, result) {
        // done();
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        else{            
            res.status(200).json('sukses')               
        }
        })   
    },

    //Menampilkan detail yang login di Menu Profil Pojok Kanan Atas
    getUserDetail(req,res){        
        var id = req.params.id
        pool.query('SELECT * FROM tbl_user_auth where npp=$1', [id],(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },

    //Untuk Mengupdate Kondisi Textbox Quantity di Menu Locking Lot
    setQty(req,res){
        var nomor_pd = req.body.nomor_pd
        var qty = req.body.qty
        console.log('masuk setQty')
        console.log(qty)
        
        pool.query("UPDATE tbl_mapping_routing_header SET curr_qty=curr_qty-$2 WHERE nomor_pd=$1",[nomor_pd,qty], function (error, result) {
        // done();
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        else{
            res.status(200).json(result.rows)        
        }
        })   
    },
    getLaporanKeterlambatan(req,res){        
        pool.query("SELECT nomor_pd,desc_mat as komponen, null as semula, null as revisi, desc_reason as penyebab, null as tindakan FROM tbl_conf JOIN tbl_reason ON tbl_conf.reason = tbl_reason.id_reason where status = 'C' ",(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },
    getDispatchList(req,res){        
        pool.query("select work_center as nomor_wc,nomor_pd,all_time as tgl_mulai,final_time as tgl_selesai, nama_routing, ROUND((EXTRACT(EPOCH FROM (final_time - all_time))/3600)::numeric,2) as durasi FROM tbl_conf where status = 'C'",(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },
    getHasilProduksi(req,res){        
        pool.query("SELECT kode_mat, desc_mat,CASE WHEN final_time_month = 1 THEN SUM ( yield_qty ) ELSE 0 END AS Januari, CASE WHEN final_time_month = 2 THEN SUM ( yield_qty ) ELSE 0 END AS Februari, CASE WHEN final_time_month = 3 THEN SUM ( yield_qty ) ELSE 0 END AS Maret, CASE WHEN final_time_month = 4 THEN SUM ( yield_qty ) ELSE 0 END AS April, CASE WHEN final_time_month = 5 THEN SUM ( yield_qty ) ELSE 0 END AS Mei, CASE WHEN final_time_month = 6 THEN SUM ( yield_qty ) ELSE 0 END AS Juni,CASE WHEN final_time_month = 7 THEN SUM ( yield_qty ) ELSE 0 END AS Juli,CASE WHEN final_time_month = 8 THEN SUM ( yield_qty ) ELSE 0  END AS Agustus, CASE WHEN final_time_month = 9 THEN SUM ( yield_qty ) ELSE 0 END AS September,CASE WHEN final_time_month = 10 THEN SUM ( yield_qty ) ELSE 0 END AS Oktober, CASE WHEN final_time_month = 11 THEN SUM ( yield_qty ) ELSE 0 END AS November, CASE WHEN final_time_month = 12 THEN SUM ( yield_qty ) ELSE 0 END AS Desember FROM ( SELECT kode_mat, desc_mat, EXTRACT ( MONTH FROM final_time ) final_time_month, yield_qty FROM tbl_conf WHERE status = 'C' ) foo GROUP BY kode_mat,desc_mat,final_time_month",(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },
    getExportConf(req,res){        
        pool.query("select * from tbl_conf where is_send is null ",(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },
    getConfDetail(req,res){
        let id = req.params.id
        pool.query("select * from tbl_conf where id=$1 ",[id],(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },
    editConf(req,res){
        let id = req.body.id
        let nama_routing = req.body.nama_routing
        pool.query("UPDATE tbl_conf SET nama_routing=$2 WHERE id=$1",[id,nama_routing], function (error, result) {
        // done();
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        else{
            res.status(200).json(result.rows)        
        }
        })   
    },
    deletePetiDetail(req,res){
        var nomor_pd = req.body.nomor_pd
        var nomor_routing = req.body.nomor_routing
        
        // console.log(nomor_pd);
        // console.log(nomor_routing);
        console.log('berhasil delete')
        pool.query('DELETE FROM tbl_peti where nomor_pd=$1 and nomor_routing=$2', [nomor_pd, nomor_routing],(error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },

    // getPetiDetailAdd(req,res){
    //     var id = req.params.id
    //     // console.log('INI ID OLOHH'+id);
        
    //     pool.query('SELECT * FROM tbl_peti where id_peti=$1', [id],(error, results) => {
    //         if (error) {
    //             console.log(error);
    //             res.status(400).send(error);
    //         }
    //         else{
    //             res.status(200).json(results.rows)
    //         }
    //     })
    // },
    postAddLot(req,res){
        let nomor_pd = req.body.nomor_pd
        let id_peti = req.body.id_peti
        let nomor_routing = req.body.nomor_routing
        let nama_routing = req.body.nama_routing
        let work_center = req.body.work_center
        // console.log(nomor_pd)
        // console.log(id_peti)
        // console.log(req.body)
        pool.query("INSERT INTO tbl_peti SELECT tbl_peti.id_peti, tbl_peti.nomor_pd, tbl_peti.kode_mat, tbl_peti.desc_mat, tbl_peti.total_routing, tbl_peti.uom, tbl_peti.qty, $3, $4, now(), null, tbl_peti.plant, tbl_peti.kali, $5, tbl_peti.satuan, tbl_peti.status_hapus, tbl_peti.status_pasang, $6, tbl_peti.npp FROM tbl_peti WHERE id_peti=$1 AND nomor_pd=$2 limit 1 ",[id_peti,nomor_pd, nomor_routing, nama_routing,work_center,1], function (error2, results2) {        
            if (error2) {
                console.log(error2)
                res.status(400).send(error2)
            } else {
                res.status(200).json('berhasil input')
            }                                                                                            
        })    
    },
    fungsiTesting(req, res){
        console.log("Berhasil masuk backend")
    }
};
