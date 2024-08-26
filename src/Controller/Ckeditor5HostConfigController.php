<?php

namespace Drupal\utils_ckeditor\Controller;

use Drupal\Core\Config\Entity\ConfigEntityListBuilder;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Url;
use Drupal\Core\Access\AccessResult;

class Ckeditor5HostConfigController extends ConfigEntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header = [
      'id' => [
        'data' => $this->t('Video ID'),
        'class' => [RESPONSIVE_PRIORITY_LOW],
      ],
      'host_name' => [
        'data' => $this->t('Host Name'),
        'class' => [RESPONSIVE_PRIORITY_LOW],
      ],
      'host_url' => [
        'data' => $this->t('Host URL'),
        'class' => [RESPONSIVE_PRIORITY_LOW],
      ],
    ];

    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /** @var \Drupal\utils_ckeditor\Entity\HostVideo $entity */

      $row['id']['data'] = $entity->id();
      $row['host_name']['data'] = $entity->host_name;
      $row['host_url']['data'] = $entity->host_url;
      return $row + parent::buildRow($entity);



  }

  /**
   * {@inheritdoc}
   */
  public function render() {
    $build['description'] = [
      '#markup' => $this->t("<p>Liste des hôtes et leurs paramètres.</p>"),
    ];
    $build[] = parent::render();
    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultOperations(EntityInterface $entity) {
    $operations = parent::getDefaultOperations($entity);

    // Add edit button to actions.
    $operations['edit'] = [
      'title' => t("Edit"),
      'weight' => 10,
      'url' => Url::fromRoute('utils_ckeditor.host_video.edit', ['host_video' => $entity->id()]),
    ];

    // Add delete button to actions.
    $operations['delete'] = [
      'title' => t("Delete"),
      'weight' => 20,
      'url' => Url::fromRoute('utils_ckeditor.host_video.delete', ['host_video' => $entity->id()]),
    ];

    return $operations;
  }

  /**
   * Checks access for this controller.
   */
  public function access() {
    $account = \Drupal::currentUser();

//    if ($account->hasPermission('access administration pages')) {
//      // Return 403 Access Denied page.
//      return AccessResult::forbidden();
//    }
    if ($account->hasPermission('Voir les configuration du module CKEditor utils_ckeditor')) {
      return AccessResult::allowed();
    }
    return AccessResult::allowed();
  }



}
