<?php

declare(strict_types = 1);

namespace Drupal\utils_ckeditor\Plugin\CKEditor5Plugin;

use Drupal\editor\EditorInterface;

/**
 * utils ckeditor plugin.
 *
 * @internal
 *   Plugin classes are internal.
 */

class Badge extends UtilsCkeditor {

  /**
   * The CKE5 config key.
   *
   * @var string
   */

  protected string $ckeditor5ConfigKey = 'badge';

  public function getDynamicPluginConfig(array $static_plugin_config, EditorInterface $editor): array {
    $config = $static_plugin_config;

    // Ajouter vos nouvelles options ici.
    $config[$this->ckeditor5ConfigKey]['options'] = [
      [
        'id' => 'withIcon',
        'label' => $this->t('Avec Icône'),
        'options' => [
          ['name' => $this->t('Succès (moyenne)'), 'type' => 'success', 'size' => 'md', 'haveIcon' => true],
          ['name' => $this->t('Succès (petite)'), 'type' => 'success', 'size' => 'sm', 'haveIcon' => true],
          ['name' => $this->t('Erreur (moyenne)'), 'type' => 'error', 'size' => 'md', 'haveIcon' => true],
          ['name' => $this->t('Erreur (petite)'), 'type' => 'error', 'size' => 'sm', 'haveIcon' => true],
          ['name' => $this->t('Info (moyenne)'), 'type' => 'info', 'size' => 'md', 'haveIcon' => true],
          ['name' => $this->t('Info (petite)'), 'type' => 'info', 'size' => 'sm', 'haveIcon' => true],
          ['name' => $this->t('Avertissement (moyenne)'), 'type' => 'warning', 'size' => 'md', 'haveIcon' => true],
          ['name' => $this->t('Avertissement (petite)'), 'type' => 'warning', 'size' => 'sm', 'haveIcon' => true],
          ['name' => $this->t('Jaune (moyenne)'), 'type' => 'new', 'size' => 'md', 'haveIcon' => true],
          ['name' => $this->t('Jaune (petite)'), 'type' => 'new', 'size' => 'sm', 'haveIcon' => true],
          ['name' => $this->t('Vert-menthe (moyenne)'), 'type' => 'green-menthe', 'size' => 'md', 'haveIcon' => true],
          ['name' => $this->t('Vert-menthe (petite)'), 'type' => 'green-menthe', 'size' => 'sm', 'haveIcon' => true],
          ['name' => $this->t('Orange (moyenne)'), 'type' => 'orange-terre-battue', 'size' => 'md', 'haveIcon' => true],
          ['name' => $this->t('Orange (petite)'), 'type' => 'orange-terre-battue', 'size' => 'sm', 'haveIcon' => true],
          ['name' => $this->t('Rose (moyenne)'), 'type' => 'purple-glycine', 'size' => 'md', 'haveIcon' => true],
          ['name' => $this->t('Rose (petite)'), 'type' => 'purple-glycine', 'size' => 'sm', 'haveIcon' => true],


        ],
      ],
      [
        'id' => 'withoutIcon',
        'label' => $this->t('Sans Icône'),
        'options' => [
          ['name' => $this->t('Sans couleur (moyenne)'), 'type' => '', 'size' => 'md', 'haveIcon' => false],
          ['name' => $this->t('Sans couleur (petite)'), 'type' => '', 'size' => 'sm', 'haveIcon' => false],
          ['name' => $this->t('Succès (moyenne)'), 'type' => 'success', 'size' => 'md', 'haveIcon' => false],
          ['name' => $this->t('Succès (petite)'), 'type' => 'success', 'size' => 'sm', 'haveIcon' => false],
          ['name' => $this->t('Erreur (moyenne)'), 'type' => 'error', 'size' => 'md', 'haveIcon' => false],
          ['name' => $this->t('Erreur (petite)'), 'type' => 'error', 'size' => 'sm', 'haveIcon' => false],
          ['name' => $this->t('Info (moyenne)'), 'type' => 'info', 'size' => 'md', 'haveIcon' => false],
          ['name' => $this->t('Info (petite)'), 'type' => 'info', 'size' => 'sm', 'haveIcon' => false],
          ['name' => $this->t('Avertissement (moyenne)'), 'type' => 'warning', 'size' => 'md', 'haveIcon' => false],
          ['name' => $this->t('Avertissement (petite)'), 'type' => 'warning', 'size' => 'sm', 'haveIcon' => false],
          ['name' => $this->t('Jaune (moyenne)'), 'type' => 'new', 'size' => 'md', 'haveIcon' => false],
          ['name' => $this->t('Jaune (petite)'), 'type' => 'new', 'size' => 'sm', 'haveIcon' => false],
          ['name' => $this->t('Vert-menthe (moyenne)'), 'type' => 'green-menthe', 'size' => 'md', 'haveIcon' => false],
          ['name' => $this->t('Vert-menthe (petite)'), 'type' => 'green-menthe', 'size' => 'sm', 'haveIcon' => false],
          ['name' => $this->t('Orange (moyenne)'), 'type' => 'orange-terre-battue', 'size' => 'md', 'haveIcon' => false],
          ['name' => $this->t('Orange (petite)'), 'type' => 'orange-terre-battue', 'size' => 'sm', 'haveIcon' => false],
          ['name' => $this->t('Rose (moyenne)'), 'type' => 'purple-glycine', 'size' => 'md', 'haveIcon' => false],
          ['name' => $this->t('Rose (petite)'), 'type' => 'purple-glycine', 'size' => 'sm', 'haveIcon' => false],
        ],
      ],
    ];

    return $config;
  }

}
