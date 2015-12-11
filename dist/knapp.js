/**
 * knapp.js - version 1.3.1
 *
 * https://github.com/bcorreia/knapp.js.git
 * Bruno Correia - mail@bcorreia.com
 *
 */
var Knapp = (function() {
    'use strict';

    var defaults = {
        selected: 0,
        onReady: function() {},
        onSelect: function() {},
        onChange: function() {},
        onComplete: function() {}
    };

    var methods = {
        init: function(node) {
            var elements = this.elements,
                parent = node.parentNode || document.querySelector('.knapp-stage'); // defaults to .knapp-stage if not node element

            // node (DOM) element provided
            if ( node.nodeName ) {
                for ( var i = 0; i < node.children.length; i += 1 ) {
                    this.data[i] = {
                        name: node.children[i].innerHTML,
                        action: node.children[i].getAttribute("data-knapp"),
                        classlist: node.children[i].getAttribute("class")
                    }
                }
            } else {
                // array of objects provided
                for ( var i = 0; i < node.length; i += 1 ) {
                    this.data[i] = {
                        name: node[i].name,
                        action: node[i].action,
                        classlist: node[i].classlist
                    }
                }
            }

            ['knapp', 'stage', 'next', 'prev'].forEach(function(name, i) {
                elements[name] = document.createElement('div');
                elements[name].classList.add(name);
            });

            elements.stage.innerText = this.data[this.settings.selected].name;
            elements.knapp.appendChild(elements.stage); // stage
            elements.knapp.insertBefore(elements.prev, elements.knapp.childNodes[0]); // prev
            elements.knapp.appendChild(elements.next); // next
            elements.stage.classList.add(this.data[this.settings.selected].classlist);

            parent.hasChildNodes() && parent.removeChild(node);
            parent.appendChild(elements.knapp);
            setTimeout(function() {
                this.settings.onReady();
            }.bind(this), 0);
            this.addlisteners();
        },
        addlisteners: function() {
            var selected = this.settings.selected,
                knapp = this.elements.knapp,
                stage = this.elements.stage;

            knapp.addEventListener('click', function(event) {
                switch ( event.target.className.match(/\w*/)[0] ) {
                    case "prev":
                        selected = (selected === 0) ? this.data.length-1 : selected -= 1;
                        stage.classList.add('transition', '-up');
                        this.settings.onChange();
                    break;

                    case "next":
                        selected = (selected === this.data.length-1) ? 0 : selected += 1;
                        stage.classList.add('transition', '-down');
                        this.settings.onChange();
                    break;

                    case "stage":
                        this.action(selected);
                    break;
                }
            }.bind(this));

            stage.addEventListener('transitionend', function(event) {
                var on = function() {
                    var stage = this.elements.stage;

                    setTimeout(function() {
                        stage.className = "";
                        stage.classList.add('stage', this.data[selected].classlist, 'transition');
                        stage.style.transform = "translateY(0)";
                        stage.removeAttribute("style");
                        this.update(selected);
                    }.bind(this), 1);
                };

                if ( event.target.className.match(/-up$/) ) {
                    stage.classList.remove('transition', '-up');
                    stage.style.transform = "translateY(100%)";
                    on.call(this);
                }

                if ( event.target.className.match(/-down$/) ) {
                    stage.classList.remove('transition', '-down');
                    stage.style.transform = "translateY(-100%)";
                    on.call(this);
                }
            }.bind(this));
        },
        update: function(selected) {
            var stage = this.elements.stage;

            stage.innerText = this.data[selected].name;
            return this.settings.onComplete(this.data[selected]); // callback
        },
        action: function(selected) {
            var item = this.data[selected],
                address = new RegExp(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/);

            item.action.match(address) ?
                window.location.href = item.action :
                this.settings.onSelect(item); // callback

            return;
        }
    };

    /**
     * extend
     * merge defaults and options
     * @param {Object} default
     * @param {Object} options
     * @returns {Object} merged values
     *
     */
     function extend(defaults, options) {
         var a = Object.create(defaults);
         Object.keys(options).map(function (prop) {
             prop in a && (a[prop] = options[prop]);
         });
         return a;
     }

     /**
      * constructor
      * @param {Object} node element or array of objects { name, classlist and action }
      * @param {Object} options
      *
      */
    function Knapp(node, options) {
        var knapp = Object.create(methods, {
            settings: { value: extend(defaults, options || {}) },
            elements: { value: {}, writable: true },
            data: { value: [], writable: true }
        });
        knapp.init(node);

        var pub = {
            /**
             * add new items
             * @param [Array of Objects] { name, action and classlist }
             */
            add: function(arr) {
                arr.forEach(function(obj, i) {
                    knapp.data.push(obj);
                });
            }
        };
        return pub;
    }

    return Knapp;
}());