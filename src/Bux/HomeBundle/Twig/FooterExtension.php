<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/2/15
 * Time: 1:43 PM
 */

namespace Bux\HomeBundle\Twig;

use Doctrine\ORM\EntityManager;

/**
 * Class FooterExtension
 *
 * @package Bux\HomeBundle\Twig
 */
class FooterExtension extends \Twig_Extension
{
    protected $em;

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
            new \Twig_SimpleFilter('footer', array($this, 'getFooter')),
        );
    }

    /**
     * @param string $name
     *
     * @return string
     */
    public function getFooter($name)
    {
        $page = $this->em->getRepository('BuxAdminSetupBundle:StaticPage')->findOneBy(array(
            'name'  => $name
        ));

        return $page->getContent();
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'footer_extension';
    }
}