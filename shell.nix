{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-17_x
    nodePackages.yarn
    nodePackages.svelte-language-server
    nodePackages.vscode-html-languageserver-bin
    nodePackages.vscode-css-languageserver-bin
    nodePackages.vscode-json-languageserver
    nodePackages.svelte-check
    nodePackages.prettier
    nodePackages.eslint
  ];
}
