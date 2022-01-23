const app = express();

app.use(express.static(__dirname+'/dist/imp-frontend'));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/imp-frontend/index.html'));
});

app.listen(process.env.PORT || 8080);