import { Rule, SchematicContext, Tree} from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function rangularTemplate(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create('rangular.ts', `public give(a: string) {
      return a + 'b;
    }`);
    return tree;
  };
}
