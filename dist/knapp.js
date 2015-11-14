/**
 * knapp.js - version 1.0.0 beta
 *
 * https://github.com/bcorreia/knapp.js.git
 * Bruno Correia - mail@bcorreia.com
 *
 */

var Knapp = (function() {
    'use strict';

    var defaults = {
        selected: 0,
        onSelect: function() {},
        onChange: function() {}
    };

    var methods = {
        init: function(list) {
            var elements = this.elements,
                parent = list.parentNode;

            for ( var i = 0; i < list.children.length; i += 1 ) {
                this.data[i] = {
                    name: list.children[i].innerHTML,
                    action: list.children[i].getAttribute("data-knapp")
                }
            };

            ['knapp', 'stage', 'next', 'prev'].forEach(function(name, i) {
                elements[name] = document.createElement('div');
                elements[name].classList.add(name);
            });

            elements.stage.innerText = this.data[this.settings.selected].name;
            elements.knapp.appendChild(elements.stage); // stage
            elements.knapp.insertBefore(elements.prev, elements.knapp.childNodes[0]); // prev
            elements.knapp.appendChild(elements.next); // next

            parent.removeChild(list);
            parent.appendChild(elements.knapp);
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
                    break;

                    case "next":
                        selected = (selected === this.data.length-1) ? 0 : selected += 1;
                        stage.classList.add('transition', '-down');
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
                        stage.classList.add('transition');
                        stage.style.transform = "translateY(0)";
                        stage.removeAttribute("style");
                        this.update(selected);
                    }.bind(this), 1);
                }

                if ( event.target.className.match(/-up$/) ) {
                    stage.classList.remove('transition', "-up");
                    stage.style.transform = "translateY(100%)";
                    on.call(this);
                }

                if ( event.target.className.match(/-down$/) ) {
                    stage.classList.remove('transition', "-down");
                    stage.style.transform = "translateY(-100%)";
                    on.call(this);
                }
            }.bind(this));
        },
        update: function(selected) {
            var stage = this.elements.stage;

            stage.innerText = this.data[selected].name;
            return this.settings.onChange(this.data[selected]); // callback
        },
        action: function(selected) {
            var item = this.data[selected];

            if ( item.action.match(/http/gi) ) {
                window.location.href = item.action;
            } else {
                return this.settings.onSelect(item); // callback
            }

        }
    }

    /**
     * merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     * @returns {Object} Merged values of defaults and options
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
      * @param {Object} options
      *
      */
    function Knapp(list, options) {
        var knapp = Object.create(methods, {
            settings: { value: extend(defaults, options || {}) },
            elements: { value: {}, writable: true },
            data: { value: [], writable: true }
        })
        knapp.init(list);
    }

    return Knapp;
}());