dojo.provide("phpr.Default.Main");

// We need the dtl for rendering the template (Default.html).
dojo.require("dojox.dtl");

dojo.require("phpr.Component");

// Load the widgets the template uses.
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.Toolbar");
dojo.require("dijit.form.Button");
dojo.require("dojo.data.ItemFileReadStore");

// app specific files
dojo.require("phpr.Default.Tree");
dojo.require("phpr.Default.Grid");
dojo.require("phpr.Default.Form");


dojo.declare("phpr.Default.Main", phpr.Component, {
    
    tree:null,
    grid:null,
	module:null,
	superMain:null,
	webpath:'',
	availableModules:null,
    
    constructor:function(webpath, availableModules, main) {
		this.superMain  = main;
		this.webpath = webpath;
		this.availableModules = availableModules;
    },
    
	openForm: function(id,module){
		this.form = new phpr.Default.Form(this,id,module);
	},
	
	loadSubElements: function(project, module) {
		navId = null;
		if(project.id){
			navId = project.id;
		}
		var updateUrl = this.webpath + 'index.php/Project/index/save/navId/';

		this.grid     = new phpr.Default.Grid(updateUrl, this, navId, module);
		if (dijit.byId("detailsBox")) {
			phpr.destroyWidgets("detailsBox");
		}		
	},
	
	submitForm: function(id,module,parent) {
		var updateUrl = this.webpath + 'index.php/Project/index/save/navId/';
		this.tree     = new phpr.Default.Tree(this,'Project');
		this.grid     = new phpr.Default.Grid(updateUrl,this,parent,module);
	},
	load:function(){
		this.render(["phpr.Default.template", "main.html"], dojo.body(),{webpath:this.webpath, currentModule:this.module});
		dojo.addOnLoad(dojo.hitch(this, function() {
       			// Load the components, tree, list and details.
				this.setSubmoduleNavigation();
				var updateUrl = this.webpath + 'index.php/'+this.module+'/index/save/id/';
        		this.tree     = new phpr.Default.Tree(this, this.module);
        		this.grid     = new phpr.Default.Grid(updateUrl, this, null, this.module);
         	})
        );
	},
	reload:function(){
		this.setSubmoduleNavigation();
		var updateUrl = this.webpath + 'index.php/'+this.module+'/index/save/id/';
        this.tree     = new phpr.Default.Tree(this, this.module);
        this.grid     = new phpr.Default.Grid(updateUrl, this, null, this.module);
		// destroy form if exists
		if (dijit.byId("detailsBox")) {
			phpr.destroyWidgets("detailsBox");
		}		
	},
	setSubmoduleNavigation: function(){
		var navigation ="";
		for(i in this.availableModules){
			var moduleName  = this.availableModules[i]["name"];
			var moduleLabel = this.availableModules[i]["label"];
			navigation += this.render(["phpr.Default.template", "navigation.html"], null,{moduleName:moduleName, moduleLabel:moduleLabel});
			i++;
		}
		dojo.byId("subModuleNavigation").innerHTML = navigation;
	}
});
