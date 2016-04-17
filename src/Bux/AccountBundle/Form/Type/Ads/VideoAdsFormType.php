<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/14/15
 * Time: 1:50 PM
 */

namespace Bux\AccountBundle\Form\Type\Ads;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Intl\Intl;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class VideoAdsFormType
 *
 * @package Bux\AccountBundle\Form\Type\Ads
 */
class VideoAdsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
//        dump(Intl::getRegionBundle()->getCountryNames());exit;
        $builder
            ->add('title', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('description', 'text', array(
                'required'  => false
            ))
            ->add('targetUrl', 'text', array(
            ))
            ->add('maxClickInDay', 'integer', array(
            ))
//            ->add('premiumMembers', 'radio', array(
//                'required'  => false,
//                'mapped'    => false
//            ))
            ->add('terms', 'checkbox', array(
                'mapped'  => false,
                'required'  => true
            ))
            ->add('value', 'entity', array(
                'class' => 'BuxAdminAdvertisementsBundle:VideoCategories',
                'property'  => 'value'
            ))
            ->add('memberships', new AdMembershipFormType(), array(
                'required'  => false
            ))
            ->add('countries', new AdCountryFormType(), array(
                'required'  => false
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\AdvertiseBundle\Entity\VideoAd',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_blog_form_type';
    }
}