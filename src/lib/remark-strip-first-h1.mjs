/**
 * Removes the first level-1 heading from a markdown document.
 *
 * The release docs in `docs/` are written as internal drafts and title themselves
 * accordingly ("Paulo Privacy Policy Draft"). The website renders its own title, so
 * the source heading would be a duplicate — and would publish the word "Draft" on a
 * page Apple reads during review.
 */
export function remarkStripFirstH1() {
  return (tree) => {
    const index = tree.children.findIndex(
      (node) => node.type === 'heading' && node.depth === 1
    );
    if (index !== -1) tree.children.splice(index, 1);
  };
}
