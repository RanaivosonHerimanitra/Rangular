import { Schema } from './schema.d';
import { Rule, SchematicContext, Tree, url, apply, template, mergeWith} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { classify } from '@angular-devkit/core/src/utils/strings';

export const generateRoutes = (urls: string, components:string) => {
  const componentArray: string[] = components.split(";");
  return urls.split(";").map((route,index) => {
    return `{path:${route}, component: ${classify(componentArray[index])}}`;
  });
}

export function routingTemplate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const srcComponentTemplate = url('./files');
    const srcRulesApplication = apply(srcComponentTemplate, [
    template({
      ..._options,
      ...strings,
      ...{generateRoutes}
    })
  ]);
  tree = mergeWith(srcRulesApplication)(tree, _context) as Tree;  
  return tree;
  };
}
