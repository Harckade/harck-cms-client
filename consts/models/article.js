import Title from './title';

const Article = function(article){
    let art = article || {};
    this.id = art.id;
    this.name = new Title(art.name);
    this.links = new Title(art.nameNoDiacritics);
    this.description = new Title(art.description);
    this.date = new Date(art.timestamp);
    this.imageUrl = new Title(art.imageUrl);
    this.imageDescription = new Title(art.imageDescription);
    this.publishDate = new Date(art.publishDate);
    this.tags = new Title(art.tags);
};
export default Article;