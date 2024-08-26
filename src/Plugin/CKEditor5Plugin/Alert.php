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

class Alert extends UtilsCkeditor {

  /**
   * The CKE5 config key.
   *
   * @var string
   */

  protected string $ckeditor5ConfigKey = 'alert';

  public function getDynamicPluginConfig(array $static_plugin_config, EditorInterface $editor): array {
    $config = $static_plugin_config;

    // Ajouter vos nouvelles options ici.
    $config[$this->ckeditor5ConfigKey]['options'] = [
      [
        'id' => 'withTitle',
        'label' => $this->t('Avec titre'),
        'options' => [
          ['name' => $this->t('Erreur (moyenne)'), 'type' => 'error', 'size' => 'md', 'title' => true],
          ['name' => $this->t('Erreur (petite)'), 'type' => 'error', 'size' => 'sm', 'title' => true],
          ['name' => $this->t('Info (moyenne)'), 'type' => 'info', 'size' => 'md', 'title' => true],
          ['name' => $this->t('Info (petite)'), 'type' => 'info', 'size' => 'sm', 'title' => true],
          ['name' => $this->t('Avertissement (moyenne)'), 'type' => 'warning', 'size' => 'md', 'title' => true],
          ['name' => $this->t('Avertissement (petite)'), 'type' => 'warning', 'size' => 'sm', 'title' => true],
          ['name' => $this->t('Succès (moyenne)'), 'type' => 'success', 'size' => 'md', 'title' => true],
          ['name' => $this->t('Succès (petite)'), 'type' => 'success', 'size' => 'sm', 'title' => true],
        ],
      ],
      [
        'id' => 'withoutTitle',
        'label' => $this->t('Sans titre'),
        'options' => [
          ['name' => $this->t('Erreur (moyenne)'), 'type' => 'error', 'size' => 'md', 'title' => false],
          ['name' => $this->t('Erreur (petite)'), 'type' => 'error', 'size' => 'sm', 'title' => false],
          ['name' => $this->t('Info (moyenne)'), 'type' => 'info', 'size' => 'md', 'title' => false],
          ['name' => $this->t('Info (petite)'), 'type' => 'info', 'size' => 'sm', 'title' => false],
          ['name' => $this->t('Avertissement (moyenne)'), 'type' => 'warning', 'size' => 'md', 'title' => false],
          ['name' => $this->t('Avertissement (petite)'), 'type' => 'warning', 'size' => 'sm', 'title' => false],
          ['name' => $this->t('Succès (moyenne)'), 'type' => 'success', 'size' => 'md', 'title' => false],
          ['name' => $this->t('Succès (petite)'), 'type' => 'success', 'size' => 'sm', 'title' => false],
        ],
      ],
    ];

    return $config;
  }

}
