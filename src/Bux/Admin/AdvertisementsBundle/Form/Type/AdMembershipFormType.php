<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/9/15
 * Time: 5:16 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class AdMembershipFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type
 */
class AdMembershipFormType extends AbstractType
{
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'class' => 'Bux\UserBundle\Entity\Membership',
            'property'  => 'name',
            'expanded'  => true,
            'multiple'  => true,
            'required'  => false
        ));
    }

    /**
     * @return string
     */
    public function getParent()
    {
        return 'entity';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ad_membership';
    }
}