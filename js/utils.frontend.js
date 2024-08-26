(function (Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.ckeditorUtils = {
    attach: function (context, settings) {
      // Ensure drupalSettings.ckeditorUtils is defined
      if (!drupalSettings.ckeditorUtils) {
        drupalSettings.ckeditorUtils = {};
      }

      const hostUrls = drupalSettings.utilsCkeditor.hostUrls || [];

      const getVideoType = (url) => {
        const extension = url.split('.').pop().toLowerCase();
        switch (extension) {
          case 'mp4':
            return 'video/mp4';
          case 'webm':
            return 'video/webm';
          case 'ogg':
            return 'video/ogg';
          default:
            return '';
        }
      };
      const processVideos = (videoClass) => {
        const $ckeditorVideos = once(videoClass, `.ckeditor-${videoClass}`, context);
        if ($ckeditorVideos.length === 0) {
          return;
        }

        $ckeditorVideos.forEach($video => {
          const childNodes = Array.from($video.children);
          let childDds = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');
          let childDts = childNodes.filter(child => child.tagName.toLowerCase() === 'dt');

          // Initialize an array to store the new <figure> elements.
          let newFigures = [];

          childDts.forEach(($dt, index) => {
            const $newFigure = document.createElement('figure');
            $newFigure.setAttribute('role', 'group');
            $newFigure.classList.add('fr-content-media');

            const ddContent = childDds[index * 2];
            const ddLink = childDds[index * 2 + 1];
            const contentText = ddContent.innerText.trim();
            const linkText = ddLink.innerText.trim();
            const videoSrc = $dt.innerText.trim();

            // Verify if the videoSrc contains one of the host URLs
            const isValidHostUrl = hostUrls.some(url => videoSrc.includes(url));
            if (!isValidHostUrl) {
              const $link = document.createElement('a');
              $link.classList.add('fr-link', 'fr-icon-arrow-right-line', 'fr-link--icon-right');
              $link.setAttribute('href', '/admin/config/content/ckeditor/utils_ckeditor/config_video/display');
              $link.textContent = 'Veuillez ajouter le domaine de la vidéo dans la configuration du module.';

              const $alert = document.createElement('div');
              $alert.classList.add('fr-alert', 'fr-alert--warning');
              const $alertTitle = document.createElement('h3');
              $alertTitle.classList.add('fr-alert__title');
              $alertTitle.textContent = 'Domaine de la vidéo non autorisé';
              const $alertText = document.createElement('p');
              $alertText.textContent = 'Le domaine de la vidéo n\'est pas autorisé.';
              $alert.appendChild($alertTitle);
              $alert.appendChild($alertText);
              $alert.appendChild($link);

              $video.parentNode.insertBefore($alert, $video);
              return;
            }

            let mediaElement;

            if (videoSrc.startsWith('https://www.youtube')) {
              // Create the iframe element for YouTube videos
              mediaElement = document.createElement('iframe');
              mediaElement.setAttribute('title', 'YouTube Video');
              mediaElement.classList.add('fr-responsive-vid');
              mediaElement.setAttribute('src', videoSrc);
              mediaElement.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
              mediaElement.setAttribute('allowfullscreen', '');
            } else {
              // Create the video element for other videos
              mediaElement = document.createElement('video');
              mediaElement.classList.add('fr-responsive-vid');
              mediaElement.setAttribute('controls', '');
              mediaElement.setAttribute('preload', 'none');
              // Create a source element
              const $sourceElement = document.createElement('source');
              $sourceElement.setAttribute('src', videoSrc);
              $sourceElement.setAttribute('type', getVideoType(videoSrc));

              mediaElement.appendChild($sourceElement);
            }


            const $figcaption = document.createElement('figcaption');
            $figcaption.classList.add('fr-content-media__caption');
            $figcaption.textContent = 'Description / Source ';

            const $link = document.createElement('a');
            $link.classList.add('fr-link');
            $link.setAttribute('href', linkText);
            $link.textContent = contentText;

            $figcaption.appendChild($link);
            $newFigure.appendChild(mediaElement);
            $newFigure.appendChild($figcaption);

            // Store the new <figure> elements for later use.
            newFigures.push($newFigure);
          });

          newFigures.forEach($newFigure => {
            // Add each new <figure> element to the DOM, just before the old <dl> container.
            $video.parentNode.insertBefore($newFigure, $video);
          });

          // Remove the old <dl> container.
          $video.remove();
        });
      };
      const processHighLight = (linkClass) => {
        const $ckeditorLinks = once(linkClass, `.ckeditor-${linkClass}`, context);
        if ($ckeditorLinks.length === 0) {
          return;
        }

        $ckeditorLinks.forEach($link => {
          const childNodes = Array.from($link.children);
          let childDds = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');
          let childDts = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');

          let newDivs = [];

          childDts.forEach(($dt, index) => {
            const $newDiv = document.createElement('div');
            $newDiv.classList.add('fr-highlight');

            const ddContent = childDds[index];
            const $content = document.createElement('p');
            $content.innerHTML = ddContent.innerHTML.trim();

            $newDiv.appendChild($content);

            newDivs.push($newDiv);
          });

          newDivs.forEach($newDiv => {
            $link.parentNode.insertBefore($newDiv, $link);
          });

          $link.remove();
        });
      };


      const processCallouts = (calloutClass, iconClass) => {
        const $ckeditorCallouts = once(calloutClass, `.ckeditor-${calloutClass}`, context);
        if ($ckeditorCallouts.length === 0) {
          return;
        }

        $ckeditorCallouts.forEach($callout => {
          const childNodes = Array.from($callout.children);
          let childDds = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');
          let childDts = childNodes.filter(child => child.tagName.toLowerCase() === 'dt');

          // Initialize an array to store the new <div> elements.
          let newDivs = [];

          childDts.forEach(($dt, index) => {
            const $newDiv = document.createElement('div');
            $newDiv.classList.add('fr-callout', iconClass);

            const ddContent = childDds[index * 2];
            const ddButton = childDds[index * 2 + 1];

            // const contentText = ddContent.innerText.trim();
            const $content = document.createElement('p');
            $content.classList.add('fr-callout__text');
            // $content.textContent = contentText;
            $content.innerHTML = ddContent.innerHTML.trim();

            let $button;
            if (ddButton) {
              // Extract the button text and href from the <a> tag within ddButton
              const $link = ddButton.querySelector('a');
              const buttonText = $link ? $link.innerText.trim() : ddButton.innerText.trim();
              const buttonHref = $link ? $link.getAttribute('href') : '#';

              $button = document.createElement('a');
              $button.classList.add('fr-btn');
              $button.textContent = buttonText;
              $button.setAttribute('href', buttonHref);
            }

            const titleText = $dt.innerText.trim();
            const $title = document.createElement('h3');
            $title.classList.add('fr-callout__title');
            $title.textContent = titleText;

            $newDiv.appendChild($title);
            $newDiv.appendChild($content);
            if ($button) {
              $newDiv.appendChild($button);
            }

            // Store the new <div> elements for later use.
            newDivs.push($newDiv);
          });

          newDivs.forEach($newDiv => {
            // Add each new <div> element to the DOM, just before the old <dl> container.
            $callout.parentNode.insertBefore($newDiv, $callout);
          });

          // Remove the old <dl> container.
          $callout.remove();
        });
      };

      const processQuote = (quoteClass) => {
        const $ckeditorQuotes = once(quoteClass, `.ckeditor-${quoteClass}`, context);
        if ($ckeditorQuotes.length === 0) {
          return;
        }

        $ckeditorQuotes.forEach($quote => {
          const childNodes = Array.from($quote.children);
          let childDds = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');
          let childDts = childNodes.filter(child => child.tagName.toLowerCase() === 'dt');

          // Initialize an array to store the new <figure> elements.
          let newFigures = [];

          childDts.forEach(($dt, index) => {
            const $newFigure = document.createElement('figure');
            $newFigure.classList.add('fr-quote', 'fr-quote--column');

            const ddContent = childDts[index];
            const contentText = ddContent ? ddContent.innerText.trim() : '';
            const $content = document.createElement('p');
            $content.innerHTML = ddContent ? ddContent.innerHTML.trim() : '';
            const $newBlockquote = document.createElement('blockquote');

            $newBlockquote.appendChild($content);

            $newFigure.appendChild($newBlockquote);

            // Store the new <figure> elements for later use.
            newFigures.push($newFigure);
          });

          newFigures.forEach($newFigure => {
            // Add each new <figure> element to the DOM, just before the old <dl> container.
            $quote.parentNode.insertBefore($newFigure, $quote);
          });

          // Remove the old <dl> container.
          $quote.remove();
        });
      };

      const generateRandomId = () => {
        return 'tabpanel-' + Math.random().toString(36).substr(2, 9);
      };

      const processTabs = (tabClass) => {
        const $ckeditorTabs = once(tabClass, `.ckeditor-${tabClass}`, context);
        if ($ckeditorTabs.length === 0) {
          return;
        }

        $ckeditorTabs.forEach($tab => {
          const childNodes = Array.from($tab.children);
          let childDds = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');
          let childDts = childNodes.filter(child => child.tagName.toLowerCase() === 'dt');

          // Initialize an array to store the new <div> elements.
          let tabButtons = [];
          let tabPanels = [];

          childDts.forEach(($dt, index) => {
            const tabId = generateRandomId();
            const tabPanelId = `${tabId}-panel`;

            const $tabButton = document.createElement('button');
            $tabButton.id = tabId;
            $tabButton.classList.add('fr-tabs__tab', 'fr-icon-checkbox-line', 'fr-tabs__tab--icon-left');
            $tabButton.setAttribute('role', 'tab');
            $tabButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            $tabButton.setAttribute('aria-controls', tabPanelId);
            $tabButton.tabIndex = index === 0 ? 0 : -1;
            $tabButton.textContent = $dt.innerText.trim();

            const $tabPanel = document.createElement('div');
            $tabPanel.id = tabPanelId;
            $tabPanel.classList.add('fr-tabs__panel');
            if (index === 0) $tabPanel.classList.add('fr-tabs__panel--selected');
            $tabPanel.setAttribute('role', 'tabpanel');
            $tabPanel.setAttribute('aria-labelledby', tabId);
            $tabPanel.tabIndex = 0;

            const ddContent = childDds[index];
            if (ddContent) {
              $tabPanel.innerHTML = ddContent.innerHTML.trim();
            }

            tabButtons.push($tabButton);
            tabPanels.push($tabPanel);
          });

          const $tabList = document.createElement('ul');
          $tabList.classList.add('fr-tabs__list');
          $tabList.setAttribute('role', 'tablist');
          $tabList.setAttribute('aria-label', 'Nom du système d\'onglet');

          tabButtons.forEach($tabButton => {
            const $li = document.createElement('li');
            $li.setAttribute('role', 'presentation');
            $li.appendChild($tabButton);
            $tabList.appendChild($li);
          });

          const $tabsContainer = document.createElement('div');
          $tabsContainer.classList.add('fr-tabs');
          $tabsContainer.appendChild($tabList);
          tabPanels.forEach($tabPanel => {
            $tabsContainer.appendChild($tabPanel);
          });

          // Add the new tab container to the DOM, just before the old <dl> container.
          $tab.parentNode.insertBefore($tabsContainer, $tab);

          // Remove the old <dl> container.
          $tab.remove();
        });
      };

      const processButton = (buttonClass) => {
        const $ckeditorButtons = once(buttonClass, `.ckeditor-${buttonClass}`, context);
        if ($ckeditorButtons.length === 0) {
          return;
        }

        $ckeditorButtons.forEach($button => {
          const childNodes = Array.from($button.children);
          let childDds = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');
          let childDts = childNodes.filter(child => child.tagName.toLowerCase() === 'dt');

          // Initialize an array to store the new <button> elements.
          let newButtons = [];

          childDts.forEach(($dt, index) => {
            const buttonLabel = $dt.innerText.trim();
            const buttonLink = childDds[index].innerText.trim();

            const $newButton = document.createElement('button');
            $newButton.classList.add('fr-btn');
            $newButton.textContent = buttonLabel;

            if (buttonLink) {
              $newButton.setAttribute('onclick', `window.location.href='${buttonLink}';`);
            }

            // Store the new <button> elements for later use.
            newButtons.push($newButton);
          });

          newButtons.forEach($newButton => {
            // Add each new <button> element to the DOM, just before the old <dl> container.
            $button.parentNode.insertBefore($newButton, $button);
          });

          // Remove the old <dl> container.
          $button.remove();
        });
      };

      const processCard = (cardClass) => {
        const $ckeditorCards = once(cardClass, `.ckeditor-${cardClass}`, context);
        if ($ckeditorCards.length === 0) {
          return;
        }

        const createCard = (dtText, ddContent, ddImage) => {
          const $secondDiv = document.createElement('div');
          $secondDiv.classList.add('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4');
          const $thirdDiv = document.createElement('div');
          $thirdDiv.classList.add('fr-card');
          const $bodyDiv = document.createElement('div');
          $bodyDiv.classList.add('fr-card__body');
          const $contentDiv = document.createElement('div');
          $contentDiv.classList.add('fr-card__content');
          const $titleDiv = document.createElement('h3');
          $titleDiv.classList.add('fr-card__title');

          const $linkTitle = document.createElement('a');
          const $link = dtText.querySelector('a');
          const titleText = $link ? $link.innerText.trim() : dtText.innerText.trim();
          const titleHref = $link ? $link.getAttribute('href') : '#';
          $linkTitle.setAttribute('href', titleHref);
          $linkTitle.innerText = titleText;

          $titleDiv.appendChild($linkTitle);
          $contentDiv.appendChild($titleDiv);

          const contentText = ddContent ? ddContent.innerText.trim() : '';
          const $content = document.createElement('p');
          $content.classList.add('fr-card__desc');
          $content.textContent = contentText;

          $contentDiv.appendChild($content);
          $bodyDiv.appendChild($contentDiv);
          $thirdDiv.appendChild($bodyDiv);

          const $divHeaderImage = document.createElement('div');
          $divHeaderImage.classList.add('fr-card__header');
          const $divImage = document.createElement('div');
          $divImage.classList.add('fr-card__img');

          if (ddImage) {
            const imageElement = ddImage.querySelector('img');
            if (imageElement) {
              imageElement.classList.add('fr-responsive-img');
              $divImage.appendChild(imageElement);
            }
          }

          $divHeaderImage.appendChild($divImage);
          $thirdDiv.appendChild($divHeaderImage);
          $secondDiv.appendChild($thirdDiv);

          return $secondDiv;
        };

        $ckeditorCards.forEach($card => {
          const childNodes = Array.from($card.children);
          let childDds = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');
          let childDts = childNodes.filter(child => child.tagName.toLowerCase() === 'dt');

          if (childDts.length > 1) {
            const $newDiv = document.createElement('div');
            $newDiv.classList.add('fr-grid-row', 'fr-grid-row--gutters');

            childDts.forEach(($dt, index) => {
              const ddContent = childDds[index * 2];
              const ddImage = childDds[index * 2 + 1];
              const dtText = $dt.innerText.trim();
              const $cardElement = createCard($dt, ddContent, ddImage);

              $dt.remove();
              if (ddContent) ddContent.remove();
              if (ddImage) ddImage.remove();

              $newDiv.appendChild($cardElement);
            });

            $card.appendChild($newDiv);
          } else {
            childDts.forEach(($dt, index) => {
              const ddContent = childDds[index * 2];
              const ddImage = childDds[index * 2 + 1];
              const dtText = $dt.innerText.trim();
              const $cardElement = createCard($dt, ddContent, ddImage);
              $dt.remove();
              if (ddContent) ddContent.remove();
              if (ddImage) ddImage.remove();

              $card.appendChild($cardElement);
            });
          }
        });
      };

      const processAlert = (alertClass) => {
        const $ckeditorAlerts = once(alertClass, `.ckeditor-${alertClass}`, context);
        if ($ckeditorAlerts.length === 0) {
          return;
        }

        $ckeditorAlerts.forEach($alert => {
          const childNodes = Array.from($alert.children);
          let childDds = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');
          let childDts = childNodes.filter(child => child.tagName.toLowerCase() === 'dt');

          // Initialize an array to store the new <div> elements.
          let newDivs = [];

          // If childDts is empty or undefined, we process only childDds
          if (!childDts.length) {
            childDts = new Array(childDds.length).fill(null); // Ensure the loop runs as many times as there are childDds
          }

          childDts.forEach(($dt, index) => {
            const $newDiv = document.createElement('div');
            const type = $alert.getAttribute('data-type') || 'info';
            const size = $alert.getAttribute('data-size') || 'medium';
            const alertClassName = `fr-alert fr-alert--${type}`;
            const sizeClass = size ? ` fr-alert--${size}` : '';
            const alertClasses = alertClassName + sizeClass;
            $newDiv.classList.add(...alertClasses.split(' '));

            const ddContent = childDds[index];

            // Create and add the content paragraph
            const $content = document.createElement('p');
            $content.classList.add('fr-alert__text');
            $content.innerHTML = ddContent ? ddContent.innerHTML.trim() : '';

            // Check if childDt exists and contains a title
            if ($dt) {
              const titleText = $dt.innerText ? $dt.innerText.trim() : '';
              if (titleText) {
                const $title = document.createElement('h3');
                $title.classList.add('fr-alert__title');
                $title.textContent = titleText;
                $newDiv.appendChild($title);
              }
            }

            $newDiv.appendChild($content);

            // Store the new <div> elements for later use.
            newDivs.push($newDiv);
          });

          newDivs.forEach($newDiv => {
            // Add each new <div> element to the DOM, just before the old <dl> container.
            $alert.parentNode.insertBefore($newDiv, $alert);
          });

          // Remove the old <dl> container.
          $alert.remove();
        });
      };


      const generateRandomIdBadge = () => {
        return 'badge-ckeditor-' + Math.random().toString(36).substr(2, 9);
      };


      const processBadge = (badgeClass) => {
        const $ckeditorBadges = once(badgeClass, `.ckeditor-${badgeClass}`, context);
        if ($ckeditorBadges.length === 0) {
          return;
        }

        $ckeditorBadges.forEach($badge => {
          const childNodes = Array.from($badge.children);
          let childDds = childNodes.filter(child => child.tagName.toLowerCase() === 'dd');

          if (childDds.length > 1) {
            // Create the <ul> container if there is more than one badge
            const size = $badge.getAttribute('data-size') || 'medium';
            const ulClassName = `fr-badges-group fr-badges-group--${size}`;
            const $ul = document.createElement('ul');
            $ul.classList.add(...ulClassName.split(' '));

            childDds.forEach(ddContent => {
              const $li = document.createElement('li');
              const $newP = document.createElement('p');
              const type = $badge.getAttribute('data-type') || 'default';
              const icon = $badge.getAttribute('data-icon') === 'true';
              const labelText = ddContent ? ddContent.innerHTML.trim() : '';
              const badgeId = generateRandomIdBadge();

              const badgeClassName = `fr-badge fr-badge--${size} fr-badge--${type}`;
              const iconClass = !icon ? 'fr-badge--no-icon' : '';
              const badgeClasses = `${badgeClassName} ${iconClass}`.trim();

              $newP.classList.add(...badgeClasses.split(' '));
              $newP.id = badgeId;
              $newP.innerHTML = labelText;

              $li.appendChild($newP);
              $ul.appendChild($li);
            });

            // Insert the <ul> element into the DOM, just before the old <dl> container.
            $badge.parentNode.insertBefore($ul, $badge);

            // Remove the old <dl> container.
            $badge.remove();
          } else if (childDds.length === 1) {
            // If there is only one badge, create a single <p> without the <ul> container
            const ddContent = childDds[0];
            const $newP = document.createElement('p');
            const type = $badge.getAttribute('data-type') || 'default';
            const size = $badge.getAttribute('data-size') || 'medium';
            const icon = $badge.getAttribute('data-icon') === 'true';
            const labelText = ddContent ? ddContent.innerHTML.trim() : '';
            const badgeId = generateRandomIdBadge();

            const badgeClassName = `fr-badge fr-badge--${size} fr-badge--${type}`;
            const iconClass = !icon ? 'fr-badge--no-icon' : '';
            const badgeClasses = `${badgeClassName} ${iconClass}`.trim();

            $newP.classList.add(...badgeClasses.split(' '));
            $newP.id = badgeId;
            $newP.innerHTML = labelText;

            // Insert the <p> element into the DOM, just before the old <dl> container.
            $badge.parentNode.insertBefore($newP, $badge);

            // Remove the old <dl> container.
            $badge.remove();
          }
        });
      };

      const processTableau = () => {
        const $tables = document.querySelectorAll('table');

        if ($tables.length === 0) {
          return;
        }

        $tables.forEach(($tableElement, index) => {

          if ($tableElement.closest('.fr-table__content')) {
            return;
          }
          const $table = document.createElement('table');
          $table.setAttribute('id', 'table-md');

          const $captionElement = $tableElement.querySelector('caption');

          const $theadElement = $tableElement.querySelector('thead');

          const $tbodyElement = $tableElement.querySelector('tbody');

          if ($captionElement) { // Check if the specific table has a caption
            const $caption = document.createElement('caption');
            $caption.innerHTML = $captionElement.innerHTML;
            $table.appendChild($caption);
          }


          if ($theadElement) {
            const $thead = document.createElement('thead');
            $thead.innerHTML = $theadElement.innerHTML;

            $thead.querySelectorAll('th').forEach(($thElement) => {
              $thElement.setAttribute('scope', 'col');
            });

            $table.appendChild($thead);
          }

          if ($tbodyElement) {
            const $tbody = document.createElement('tbody');

            $tbodyElement.querySelectorAll('tr').forEach(($trElement, rowIndex) => {
              $trElement.setAttribute('id', 'table-md-row-key-' + (rowIndex + 1));
              $trElement.setAttribute('data-row-key', rowIndex + 1);

              $trElement.querySelectorAll('td').forEach(($tdElement) => {
                const $td = document.createElement('td');
                $td.innerHTML = $tdElement.innerHTML;
                $trElement.replaceChild($td, $tdElement);
              });

              $tbody.appendChild($trElement.cloneNode(true));
            });

            $table.appendChild($tbody);
          }

          const $wrapperDiv = document.createElement('div');
          $wrapperDiv.classList.add('fr-table__wrapper');

          const $containerDiv = document.createElement('div');
          $containerDiv.classList.add('fr-table__container');

          const $contentDiv = document.createElement('div');
          $contentDiv.classList.add('fr-table__content');

          const $firstDiv = document.createElement('div');
          $firstDiv.classList.add('fr-table');
          $firstDiv.setAttribute('id', 'table-md-component');

          $firstDiv.appendChild($wrapperDiv);
          $wrapperDiv.appendChild($containerDiv);
          $containerDiv.appendChild($contentDiv);
          $contentDiv.appendChild($table);

          // Remplacer l'ancien tableau par le nouveau
          $tableElement.parentNode.insertBefore($firstDiv, $tableElement);
          $tableElement.remove();
        });
      };

      // Appel de la fonction après le chargement du DOM
      document.addEventListener('DOMContentLoaded', () => {
        processTableau();
      });



      processBadge('badge');

      processAlert('alert');

      processCard('card');

      processButton('button');
      // Process Tabs
      processTabs('tab');
      // Process the quote
      processQuote('quote');
      // Process the callouts for callout
      processCallouts('callout', 'fr-icon-information-line');
      processCallouts('calloutButton', 'fr-icon-information-line');
      // Process the videos for video
      processVideos('video');
      // Process the highLight for highLight
      processHighLight('highLight');
    }
  };

})(Drupal, drupalSettings);
