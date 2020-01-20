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
    update(req,res){
        var id = req.body.id
        var name = req.body.name
        var age = req.body.age
        pool.query("UPDATE customers SET name=$2 , age=$3 WHERE id=$1",[id,name,age], function (error, result) {
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
    getNomorPd(req,res){
        pool.query("SELECT * FROM tbl_mapping_routing_header WHERE NOT EXISTS (SELECT * FROM tbl_conf WHERE tbl_conf.nomor_pd = tbl_mapping_routing_header.nomor_pd) and is_deleted is null AND qty != 0 ORDER BY nomor_pd", (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            else{
                res.status(200).json(results.rows)
            }
        })
    },
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
    setQty(req,res){
        var nomor_pd = req.body.nomor_pd
        var qty = req.body.qty
        console.log('masuk setQty')
        console.log(qty)
        
        pool.query("UPDATE tbl_mapping_routing_header SET qty=qty-$2 WHERE nomor_pd=$1",[nomor_pd,qty], function (error, result) {
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
};
