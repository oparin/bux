<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/5/15
 * Time: 3:05 PM
 */

namespace Bux\BlogBundle\Twig;

use Doctrine\ORM\EntityManager;

/**
 * Class BlogBannerExtension
 *
 * @package Bux\BlogBundle\Twig
 */
class BlogBannerExtension extends \Twig_Extension
{
    private $em;

    /**
     * @param EntityManager $manager
     */
    public function __construct(EntityManager $manager)
    {
        $this->em = $manager;
    }

    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('blogBannerLink', array($this, 'getLink')),
        );
    }

    /**
     * @param string $banner
     *
     * @return string
     */
    public function getLink($banner)
    {
        $settings = $this->em->getRepository('BuxAdminBlogBundle:BlogSettings')->find(1);

        if ($banner == 'side') {
            return $settings->getBannerSideLink();
        }

        if ($banner == 'bottom') {
            return $settings->getBannerBottomLink();
        }
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'blog_banner_extension';
    }
}