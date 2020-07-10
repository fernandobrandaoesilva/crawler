const Api = require('../services/api');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    
    async search(req, res){
        try {
                let limit = 10, page = 1, search = null;
                if(Object.keys(req.query).length) {
                    limit = req.query.limit || 10;
                    page = req.query.page || 1;
                    search = req.query.search || null;
                } else if(req.body) {
                    console.log(req.body);
                    limit = req.body.limit || 10;
                    page = req.body.page || 1;
                    search = req.body.search || null;
                }
                console.log('Crawler ===> ['+(new Date().toLocaleString('pt-BR'))+'] query: limit | '+limit + page | '+page' + search | '+search');
                if(search) {
                    let results = [];
                    axios.get('https://lista.mercadolivre.com.br/'+search)
                    .then((response) => {
                        let html = response.data;
                        let $ = cheerio.load(html); 
                        $('.results-item').slice(limit*(page-1),limit*page).each(function(i, elem) {
                            let result = {
                                name: $(this).find('.item__title').text().trim(),
                                link: $(this).find('a').attr("href"),
                                price: $(this).find('.item__price > .price__fraction').text().trim()+','+$(this).find('.item__price > .price__decimals').text().trim(),
                                store: $(this).find('.item__brand-title-tos').text().trim(),
                                state: $(this).find('.item__condition').text().trim(),
                            };
                            results.push(result);
                        });
                        let requests = [];
                        results.forEach((result) => {
                            requests.push(axios.get(result.link));
                        });
                        return res.json(results);
                       
                    })
                    .catch((error) => {
                        console.log('[Crawler] ['+(new Date().toLocaleString('pt-BR'))+'] erro ===>', errors);
                    });
                } else {
                    return res.json([]);
                }

        } catch (error) {
            res.status(400).send(error)
        }
    },

    
};