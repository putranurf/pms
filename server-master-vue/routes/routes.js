const express = require('express');
const router = express.Router();

const { getPeti,
        getPetiDetail,
        getNomorPd,
        getNomorPdDetail,
        getNomorPetiDetail,
        getUserDetail,
        update,   
        lepas,
        gantiPassword,
        postMappingRooting,
        postLogin,
        postDelete,
        setQty,
        getLaporanKeterlambatan,
        getDispatchList,
        getHasilProduksi
         } = require('../controller/')

router.get('/getPeti',getPeti)
router.get('/getPetiDetail/:id',getPetiDetail)
router.get('/getNomorPd', getNomorPd)
router.get('/getNomorPdDetail/:id', getNomorPdDetail)
router.get('/getNomorPetiDetail/:id',getNomorPetiDetail)
router.get('/getUserDetail/:id',getUserDetail)
router.get('/getLaporanKeterlambatan/',getLaporanKeterlambatan)
router.get('/getDispatchList/',getDispatchList)
router.get('/getHasilProduksi/',getHasilProduksi)
router.put('/update', update)
router.put('/lepas/', lepas)
router.put('/gantiPassword', gantiPassword)
router.put('/setQty/',setQty)
router.post('/postMappingRooting',postMappingRooting)
router.post('/postLogin',postLogin)
router.post('/postDelete',postDelete)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
